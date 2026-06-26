export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: ["/admin/", "/dashboard/", "/portal/"],
      },
    ],

    sitemap: "https://websterwork.com/sitemap.xml",

    host: "https://websterwork.com",
  };
}
