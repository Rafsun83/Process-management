// const { Program } = require('../model/processModel');
// async function updateCreatedAtField() {
//     try {
//         const posts = await Program.find();
//         await Promise.all(posts.map(async post => {
//             post.Creation_time.push(moment().format('hh:mm a DD.MM.YYYY'));
//             await post.save();
//         }));
//     } catch (err) {
//         console.error('Error updating Creation_time field:', err);
//     }
// }
// setInterval(updateCreatedAtField, 30000);