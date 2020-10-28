const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const Paystack = require('./Paystack')

// Node Types
const PRODUCT_NODE_TYPE = `Product`
const CUSTOMER_NODE_TYPE = `Customer`

let leMap = {
  products: {
    node_type: 'Product',
    get: async (a, b, c, d) => await sourceProducts(a, b, c, d)
  },
  customers: {
    node_type: 'Customer',
    get: async (a, b, c, d) => await sourceCustomers(a, b, c, d)
  }
}

exports.sourceNodes = async (
  { actions: { createNode }, createContentDigest, createNodeId },
  pluginOptions
) => {
  const paystack = new Paystack(pluginOptions.apiKey)
  let { dataObjects } = pluginOptions
  for (let dataObject of dataObjects) {
    await leMap[dataObject]['get'](
      paystack,
      createNode,
      createContentDigest,
      createNodeId
    )
  }
  return
}

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  createNodeId,
  getCache
}) => {
  if (node.internal.type === PRODUCT_NODE_TYPE) {
    if (node.files.length > 0) {
      for (let file of node.files) {
        if (file.type === 'image') {
          const fileNode = await createRemoteFileNode({
            url: file.path,
            parentNodeId: node.id,
            createNode,
            createNodeId,
            getCache
          })
          if (fileNode) {
            file.remoteImage___NODE = fileNode.id
          }
        }
      }
    }
  }
}

async function sourceProducts(
  paystack,
  createNode,
  createContentDigest,
  createNodeId
) {
  const products = await paystack.products()

  // loop through data and create Gatsby nodes
  products.forEach((product) => {
    createNode({
      ...product,
      files: product.files && product.files.length > 0 ? product.files : [],
      id: createNodeId(`${PRODUCT_NODE_TYPE}-${product.id}`),
      parent: null,
      children: [],
      internal: {
        type: PRODUCT_NODE_TYPE,
        content: JSON.stringify(product),
        contentDigest: createContentDigest(product)
      }
    })
  })
}

async function sourceCustomers(
  paystack,
  createNode,
  createContentDigest,
  createNodeId
) {
  const customers = await paystack.customers()

  // loop through data and create Gatsby nodes
  customers.forEach((customer) => {
    createNode({
      ...customer,
      id: createNodeId(`${CUSTOMER_NODE_TYPE}-${customer.id}`),
      parent: null,
      children: [],
      internal: {
        type: CUSTOMER_NODE_TYPE,
        content: JSON.stringify(customer),
        contentDigest: createContentDigest(customer)
      }
    })
  })
}

// function populate(
//   dataObject,
//   paystack,
//   createNode,
//   createContentDigest,
//   createNodeId
// ) {
//   let node = {}
//   switch(dataObject){
//     case 'products':
//     default:
//       node = {
//         ...node,
//         id: createNodeId(`${leMap[dataObject][node_type]}`)
//       }

//   }
// }
