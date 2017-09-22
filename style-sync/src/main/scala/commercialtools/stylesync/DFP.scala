package commercialtools.stylesync

import com.google.api.ads.common.lib.auth.OfflineCredentials
import com.google.api.ads.common.lib.auth.OfflineCredentials.Api
import com.google.api.ads.dfp.axis.factory.DfpServices
import com.google.api.ads.dfp.axis.utils.v201708.StatementBuilder
import com.google.api.ads.dfp.axis.v201708.{CreativeTemplate, CreativeTemplateServiceInterface, NativeStyle, NativeStyleServiceInterface, NativeStyleStatus}
import com.google.api.ads.dfp.lib.client.DfpSession
import com.google.api.client.auth.oauth2.Credential

import scala.annotation.tailrec
import scala.util.{Failure, Success, Try}

// this is largely based off the documentation here: https://developers.google.com/doubleclick-publishers/docs/native
object DFP extends Logging {
  lazy val creds: Credential = new OfflineCredentials.Builder()
    .forApi(Api.DFP)
    .fromFile()
    .build()
    .generateCredential()

  lazy val session: DfpSession = new DfpSession.Builder()
    .fromFile()
    .withOAuth2Credential(creds)
    .build()

  lazy val services: DfpServices = new DfpServices()

  lazy val nativeStyleService: NativeStyleServiceInterface = services.get(session, classOf[NativeStyleServiceInterface])

  lazy val creativeTemplateService: CreativeTemplateServiceInterface = services.get(session, classOf[CreativeTemplateServiceInterface])

  private case class PageResultAndTotalSize[A](elements: List[A], totalResultSize: Int)

  @tailrec
  private def processPage[A](service: StatementBuilder => Try[PageResultAndTotalSize[A]],
                             statement: StatementBuilder,
                             elementsSoFar: List[A]): List[A] = {

    service(statement) match {
      case Failure(err) =>
        logger.error(s"Page fetching failed", err); elementsSoFar
      case Success(PageResultAndTotalSize(latestElements, totalResultSize)) =>
        latestElements match {
          case _ if latestElements.isEmpty =>
            logger.info(s"No results found from latest fetch. Retrieved ${elementsSoFar.size} of $totalResultSize."); elementsSoFar
          case _ =>
            val elements: List[A] = elementsSoFar ++ latestElements

            logger.info(s"Received ${elements.size} of $totalResultSize.")

            statement.increaseOffsetBy(StatementBuilder.SUGGESTED_PAGE_LIMIT)
            if (statement.getOffset < totalResultSize) {
              processPage(service, statement, elements)
            } else {
              elements
            }
        }
    }
  }

  val nativeStylesStatement: StatementBuilder = new StatementBuilder()
    .where("status = :status")
    .orderBy("id DESC")
    .limit(StatementBuilder.SUGGESTED_PAGE_LIMIT)
    .withBindVariableValue("status", NativeStyleStatus.ACTIVE.toString)

  def fetchNativeStyles(statement: StatementBuilder = nativeStylesStatement): List[NativeStyle] = {

    def service(statement: StatementBuilder): Try[PageResultAndTotalSize[NativeStyle]] =
      Try(
        nativeStyleService.getNativeStylesByStatement(statement.toStatement)
      ) map { page =>
        PageResultAndTotalSize(page.getResults.toList, page.getTotalResultSetSize)
      }

    processPage[NativeStyle](service, statement, Nil)
  }

  // Native Formats are modelled as Creative Templates
  val nativeFormatsStatementBuilder: StatementBuilder = new StatementBuilder()
    .where("isNativeEligible = :isNativeEligible AND status = :status")
    .orderBy("id DESC")
    .limit(StatementBuilder.SUGGESTED_PAGE_LIMIT)
    .withBindVariableValue("isNativeEligible", true)
    .withBindVariableValue("status", NativeStyleStatus.ACTIVE.toString)

  def fetchCreativeTemplates(statement: StatementBuilder = nativeFormatsStatementBuilder): List[CreativeTemplate] = {

    def service(statement: StatementBuilder): Try[PageResultAndTotalSize[CreativeTemplate]] =
      Try(
        creativeTemplateService.getCreativeTemplatesByStatement(statement.toStatement)
      ) map { page =>
        PageResultAndTotalSize(page.getResults.toList, page.getTotalResultSetSize)
      }

    processPage[CreativeTemplate](service, statement, Nil)
  }
}