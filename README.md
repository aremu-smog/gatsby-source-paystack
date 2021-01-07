## Install

```npm install gatsby-source-paystack```



## How to use

In the plugin options, you'll need to specify two parameters
* `dataObjects` - An array that represents the data you want to fetch. So if I wanted to fetch Products and Customers, I would pass the array `['products', 'customers']`.
* `apiKey` - Your Paystack secret key. You need to keep this secure and not commit it to your source control, so we recommend using `dotenv` to expose the key as an environment variable. Gatsby has a [guide on using environment variables and using dotenv](https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/) that you might find helpful.

Example:
```
// In your gatsby-config.js
module.exports  = {
    plugins: [
        {
	    resolve: `gatsby-source-paystack`,
	    options: {
		dataObjects: ["products"],
		apiKey: process.env.PAYSTACK_SECRET_KEY,
	    },
	},
    ]
}
```
