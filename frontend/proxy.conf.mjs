export default [
  {
    context: ["/api", "/images", "manifest.webmanifest"],
    target: "http://172.17.0.1:2000/",
    secure: false,
  },
];
