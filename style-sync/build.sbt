name := "style-sync"

scalaVersion := "2.12.3"

val slf4jVersion = "1.7.5"

libraryDependencies ++= Seq(
  "com.google.api-ads" % "dfp-axis" % "4.1.0",
  "org.slf4j" % "slf4j-api" % slf4jVersion,
  "org.slf4j" % "slf4j-simple" % slf4jVersion
)
