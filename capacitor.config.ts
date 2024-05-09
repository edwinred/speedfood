import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "speedfood",
  webDir: "dist",
  server: {
    androidScheme: "https",
    allowNavigation: ["192.168.1.81:3000"],
  },
};

export default config;
