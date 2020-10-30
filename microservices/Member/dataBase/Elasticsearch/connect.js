const {Client} = require('@elastic/elasticsearch');

// module.exports.client = new Client({node: 'http://localhost:9200'});
module.exports.client = new Client({node: `${process.argv[4]}`});



// async function run () {
//     // Let's start by indexing some data
//     await client.index({
//         index: 'game-of-thrones',
//         // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
//         body: {
//             character: 'Ned Stark',
//             quote: 'Winter is coming.'
//         }
//     }, {ignore: [404]})
//
//     await client.index({
//         index: 'game-of-thrones',
//         // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
//         body: {
//             character: 'Daenerys Targaryen',
//             quote: 'I am the blood of the dragon.'
//         }
//     }, {ignore: [404]})
//
//     await client.index({
//         index: 'game-of-thrones',
//         // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
//         body: {
//             character: 'Tyrion Lannister',
//             quote: 'A mind needs books like a sword needs a whetstone.'
//         }
//     }, {ignore: [404]})
//
//     // here we are forcing an index refresh, otherwise we will not
//     // get any result in the consequent search
//     await client.indices.refresh({ index: 'game-of-thrones' }, {ignore: [404]})
//
//     // Let's search!
//     const { body } = await client.search({
//         index: 'game-of-thrones',
//         // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
//         body: {
//             query: {
//                 match: { quote: 'winter' }
//             }
//         }
//     }, {
//         ignore: [404]
//     })
//
//     console.log(body.hits.hits)
// }

// run().catch(console.log)

// async function run () {
//     const {body} = await client.update({
//         index: 'game-of-thrones',
//         id: '8G4URXUBBWDiuKIQRWwM',
//         body: {
//             doc: {quote: 'Winter is coming. Year'}
//         }
//         // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
//         // body: {
//         //     query: {
//         //         match: { quote: 'winter' }
//         //     }
//         // }
//     })
//     console.log(body)
// }
// run().then()
