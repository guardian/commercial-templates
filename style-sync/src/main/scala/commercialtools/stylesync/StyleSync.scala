package commercialtools.stylesync

import java.io.File
import java.nio.file.Paths

import com.google.api.ads.admanager.axis.v201808.{CreativeTemplate, CreativeTemplateType, NativeStyle}

import scala.io.Source

case class GuStyle(formatName: String,
                   dfpFormat: Option[CreativeTemplate],
                   styleName: String,
                   dfpStyle: Option[NativeStyle],
                   localPath: String,
                   testFile: Option[File]) {

  val localHtmlLines: List[String] = Source.fromFile(Paths.get(localPath, "index.html").toFile).getLines.toList
  val localCssLines: List[String] = Source.fromFile(Paths.get(localPath, "index.css").toFile).getLines.toList
}

object StyleSync extends App {

  /*
     Builds up a list of GuStyle objects, which link locally built templates to their
     respective formats (CreativeTemplates) and styles (NativeStyles) in DFP.
  */
  def findStyles(buildRootDirectory: File,
                 nativeFormats: List[CreativeTemplate],
                 nativeStyles: List[NativeStyle]): List[GuStyle] = {

    def titleCase(str: String, delim: String = " "): String =
      str.split(delim).map(word =>
        word.head.toUpper + word.tail.toLowerCase
      ).mkString(delim)

    def deriveFormatName(formatDirectory: String) =
      titleCase(formatDirectory.replaceAll("-", " "))
      .replaceAll("Capi", "cAPI")

    def deriveStyleName(styleDirectory: String, formatName: String) = {
      val platform = if(styleDirectory == "amp") "AMP" else styleDirectory.capitalize
      s"$platform - $formatName"
    }

    for {
      formatDirectory <- buildRootDirectory.listFiles.toList
      if formatDirectory.isDirectory
      styleDirectory <- formatDirectory.listFiles.toList
      if styleDirectory.isDirectory
    } yield {

      val formatName: String = deriveFormatName(formatDirectory.getName)
      val styleName: String = deriveStyleName(styleDirectory.getName, formatName)

      val format: Option[CreativeTemplate] = nativeFormats find { _.getName == formatName }
      val style: Option[NativeStyle] = nativeStyles find { _.getName == styleName}
      val testFile: Option[File] = formatDirectory.listFiles.find(_.getName == "test.json")

      GuStyle(
              formatName = formatName,
              dfpFormat = format,
              styleName = styleName,
              dfpStyle = style,
              localPath = styleDirectory.getAbsolutePath,
              testFile)
    }
  }

  case class DiffLine(line: String, number: Int)
  case class DiffResult(diffLines: List[DiffLine], sourceALines: List[String], sourceBLines: List[String])

  val buildRootDirectory = new File("/Users/kate_whalen/Projects/commercial-templates/build")
  val divider: String = "------------------------------------------------------------------"

  def summarise(formats: List[CreativeTemplate], styles: List[NativeStyle], guStyles: List[GuStyle]): Unit = {

    def printSummary(message: String, elements: List[String]): Unit = {
      println(divider)
      println(message)
      elements foreach { element => println(s"\t$element")}
    }

    def compareLines(sourceA: List[String], sourceB: List[String]): DiffResult = {
      val diffLines = sourceA.filterNot(a => sourceB.contains(a)).zipWithIndex map DiffLine.tupled
      DiffResult(diffLines, sourceA, sourceB)
    }

    def summariseDiff(diffResult: Option[DiffResult]) = {
      diffResult match {
        case None => s"missing"
        case Some(result) if result.diffLines.isEmpty => "matches"
        case Some(result) => "differs (%d/%d)".format(result.diffLines.size, result.sourceALines.size)
      }
    }

    val formatsMissingInDFP: List[String] = guStyles filter (_.dfpFormat.isEmpty) map (_.formatName)
    printSummary("1. Formats found locally, not in DFP:", formatsMissingInDFP)

    val stylesMissingInDFP: List[String] = guStyles filter (_.dfpStyle.isEmpty) map (_.styleName)
    printSummary("2. Styles found locally, not in DFP:", stylesMissingInDFP)

    val formatsMissingInConfigs: List[String] = formats filter { format =>
      !guStyles.exists(_.formatName == format.getName)
    } map (_.getName)
    printSummary("3. Formats in DFP, not found locally:", formatsMissingInConfigs)

    val stylesMissingInConfigs: List[String] = styles filter { style =>
      !guStyles.exists(_.styleName == style.getName)
    } map (_.getName)
    printSummary("4. Styles in DFP, not found locally:", stylesMissingInConfigs)

    println("5. Comparison of HTML/CSS locally and in DFP:")
    for (guStyle <- guStyles) {

      val styleString: String = s"Style: ${guStyle.styleName}"

      val cssDiffLines: Option[DiffResult] = guStyle.dfpStyle map (dfpStyle => compareLines(guStyle.localCssLines, dfpStyle.getCssSnippet.split("\n").toList))
      val cssResult = s"CSS: ${summariseDiff(cssDiffLines)}"

      val htmlDiffLines: Option[DiffResult] = guStyle.dfpStyle map (dfpStyle => compareLines(guStyle.localHtmlLines, dfpStyle.getHtmlSnippet.split("\n").toList))
      val htmlResult = s"HTML: ${summariseDiff(htmlDiffLines)}"

      val testFileResult = s"Test File: ${if (guStyle.testFile.isDefined) "found" else "missing"}"

      println("\t%1$-50s %2$-25s %3$-25s %4$-20s".format(styleString, htmlResult, cssResult, testFileResult))
    }
  }

  val nativeFormats: List[CreativeTemplate] = DFP.fetchCreativeTemplates() filter { _.getType == CreativeTemplateType.USER_DEFINED }
  val nativeStyles: List[NativeStyle] = DFP.fetchNativeStyles()
  val guStyles: List[GuStyle] = findStyles(buildRootDirectory, nativeFormats, nativeStyles)

  summarise(nativeFormats, nativeStyles, guStyles)
}
