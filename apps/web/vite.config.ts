import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

function myLogger() {
  return {
    name: "my-logger",
    transform(code: string, id: string) {
      if (id.endsWith(".tsx")) {
        console.log("🔌 my-logger 处理了:", id);
      }
      return code;
    },
  };
}

export default defineConfig({
  plugins: [react(), myLogger()],
});
