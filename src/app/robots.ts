import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/signin", "/signup", "/create", "/user/edit", "/search"],
    },
    sitemap: "https://philoart.io/sitemap.xml",
  };
}
