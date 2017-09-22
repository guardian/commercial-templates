name := "style-sync"

scalaVersion := "2.12.3"

libraryDependencies ++= Seq(
  "com.google.api-ads" % "dfp-axis" % "3.7.0",
  "org.slf4j" % "slf4j-api" % "1.7.5",
  "org.slf4j" % "slf4j-simple" % "1.7.5",
  "io.circe" %% "circe-core" % "0.8.0",
  "io.circe" %% "circe-generic" % "0.8.0",
  "io.circe" %% "circe-yaml" % "0.6.1"
)
