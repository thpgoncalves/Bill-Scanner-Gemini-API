<div id="top"></div>
<br />
<div align="center">
 <h1 align="center">Bill Reader - Gemini API</h3>
</div>

## About The Project

This project is a RESTful architecture project, with the function of reading bills via the Gemini API, to interpret these images and extract measurement results and other specific fields, where the interpretation of the results is saved in MongoDB.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [TypeScript](https://www.typescriptlang.org/)
* [Node.js](https://nodejs.org/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage Examples

### Usage: Managing and organizing bills from 1 or more locations.

#### Application:
###### Upload the image you want the results to extract and save in the system data base. 
###### With a specific route for each situation: uploading, changing/confirming results and listing all accounts linked to a specific id.

<p align="right">(<a href="#top">back to top</a>)</p>

## How to use it

#### Create an “.env” file in the root. In this file define the variable “GEMINI_API_KEY” and enter your key for using the Gemini API (Do not share your key in public files or with other people so as not to generate undue charges).

#### Once this has been set, you can check Gemini's documentation to understand how to access the correct endpoints. For this specific application, I'm using the URL provided in the documentation to upload photos. Be aware that this link may change with future updates to Gemini or the documentation.

#### Path to define the endpoint if you need to make changes: src/api/services/llmService.ts

#### With all the settings correct, access the terminal and do the following sequence of commands:
1. npm install 
2. npm run dev

#### After the commands, the application should be running locally on a predefined access port. Using postman or a similar program, you can access the specific routes to use the program's features.

#### Routes:
- POST /upload
- PATCH /confirm
- GET /customer_code/list

#### If you have any problems, you can use the “npm run test” command to run unit and integration tests to better understand where the problem lies.

<!-- CONTACT -->
## Contact
How to get in contact with me:

[![LinkedIn][3.2]][3] - Thiago Gonçalves


[3.2]: https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/linkedin-3-16.png
[3]: https://www.linkedin.com/in/thiago-pereira-goncalves/

Project Link: [https://github.com/thpgoncalves/bill-scanner](https://github.com/thpgoncalves/Bill-Scanner-Gemini-API)

<p align="right">(<a href="#top">back to top</a>)</p>
