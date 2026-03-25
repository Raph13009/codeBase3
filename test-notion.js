import dotenv from "dotenv"
import { Client } from "@notionhq/client"

dotenv.config()

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

async function testInsert() {

  console.log("Starting Notion test")

  console.log("Database:", process.env.NOTION_DATABASE_ID)

  try {

    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: "Local Test Conversion",
              },
            },
          ],
        },
        Date: {
          date: {
            start: new Date().toISOString(),
          },
        },
        "File name": {
          rich_text: [
            {
              text: {
                content: "test.pdf",
              },
            },
          ],
        },
        Layout: {
          rich_text: [
            {
              text: {
                content: "vertical",
              },
            },
          ],
        },
      },
    })

    console.log("SUCCESS")
    console.log(response.id)

  } catch (error) {

    console.log("ERROR")
    console.log(error)

  }

}

testInsert()
