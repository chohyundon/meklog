/**
 * Expo run:ios skips -allowProvisioningUpdates when DEVELOPMENT_TEAM
 * is hardcoded in the Xcode project (wildcard profile error).
 * Strip it so expo run:ios can auto-provision meoklog.app.
 */
import fs from "fs";

const pbxprojPath = "ios/app.xcodeproj/project.pbxproj";

if (!fs.existsSync(pbxprojPath)) {
  console.error("ios/ folder not found. Run: npx expo prebuild --platform ios");
  process.exit(1);
}

let content = fs.readFileSync(pbxprojPath, "utf8");
const before = content;

content = content.replace(/\t\t\t\tDEVELOPMENT_TEAM = [^;]+;\n/g, "");
content = content.replace(/\t\t\t\t\t\tDevelopmentTeam = [^;]+;\n/g, "");

if (content === before) {
  console.log("iOS signing: ready (no hardcoded DEVELOPMENT_TEAM)");
} else {
  fs.writeFileSync(pbxprojPath, content);
  console.log("iOS signing: removed DEVELOPMENT_TEAM for auto-provisioning");
}
