import clientAxios from "../config/axios"

const URL_ALL_DIGIMONS = "/api/v1/digimon"

function generateSiteMap(digimons) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://digiapp.vercel.app</loc>
     </url>
     ${digimons
         .map(({ slug }) => {
             return `
       <url>
            <loc>https://digiapp.vercel.app/digimon/${slug}</loc>
       </url>
     `
         })
         .join("")}
   </urlset>
 `
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
    try {
        // We make an API call to gather the URLs for our site
        const { data } = await clientAxios.get(URL_ALL_DIGIMONS + "?limit=1500")
        // We generate the XML sitemap with the posts data
        const sitemap = generateSiteMap(data.digimons)

        res.setHeader("Content-Type", "text/xml")
        // we send the XML to the browser
        res.write(sitemap)
        res.end()

        return {
            props: {},
        }
    } catch (error) {
        console.log("error", error)
    }
}

export default SiteMap
