// const pool = require('../loaders/database/connection');
const knex = require('../config/knex_config');



module.exports = {
    select: async (selection, tableName, where) => {
        // defaultLogger.info("Inmodels/user");
        // moduleLogger.info("select()");
        // moduleLogger.debug(
        //   `select(${selection}, ${tableName} ,${JSON.stringify(where)})`
        // );
        return await knex.select(selection).from(tableName).where(where);
      },

      insert: async (tableName, data) => {
        // defaultLogger.info("Inmodels/user");
        // moduleLogger.info("insert()");
        // moduleLogger.debug(
        //   `insert(${JSON.stringify(tableName)}, ${JSON.stringify(data)})`
        // );
        const query =  knex(tableName)
          .insert(data)
          console.log(query.toString())
          return await query;
          
      },

      selectAll: async (selection, tableName) => {
        // defaultLogger.info("Inmodels/user");
        // moduleLogger.info("selectAll()");
        // moduleLogger.debug(
        //   `selectAll(${selection}, ${tableName}, ${JSON.stringify(
        //     where
        //   )}, ${JSON.stringify(whereNot)})`
        // );
        return await knex
          .select(selection.split(","))
          .from(tableName);
      },

      update: async (tableName, data, where) => {
        // defaultLogger.info("Inmodels/user");
        // moduleLogger.info("update()");
        // moduleLogger.debug(
        //   `update(${JSON.stringify(tableName)}, ${JSON.stringify(
        //     data
        //   )} , ${JSON.stringify(where)}, ${JSON.stringify(whereNot)})`
        // );
        return await knex(tableName).where(where).update(data);
      },


}




















// const getBlog = async (req, res, next)=>{
//     try{
//         await knex.select().from('blog')
//     }catch (error) {
//         next(error);
//     }
// }

// const getBlogBYID = async (req, res, next)=>{
//     // const user_id = parseInt(req.params.id)

//     try{
//         let where = {};  
//         const id = parseInt(req.params.id)
//         where["id"] = id;
//         console.log(where)
//         await knex.select().from('blog').where(where);

//     }catch (error) {
//         next(error);
//     }
// }


// const createBlog = async (req, res, next)=>{
//     const { id, title, body, user_id } = req.body
//     pool.query("INSERT INTO blog (id, title, body, user_id) VALUES ($1, $2, $3, $4)", [id, title, body, user_id], (error, results)=>{
//         if (error){
//             console.log(error);
//         }else{
//         res.send(`blog added`)
//         }
//     })
// }

// const updateBlog = (req,res)=>{
//     const id = parseInt(req.params.id)
//   const { title, body } = req.body

//   pool.query("UPDATE blog SET title = $1, body = $2 WHERE id = $3", [title, body, id], (error, results)=>{
//       if (error){
//           throw error
//       }
//       res.send(`User modified with ID: ${id}`)
//   })
// }

// const deleteBlog = (req,res)=>{
//     const id = parseInt(req.params.id)

//     pool.query("DELETE FROM blog WHERE id = $1", [id], (error, results)=>{
//         if (error){
//             throw error
//         }
//         res.send(`User deleted with ID: ${id}`)
//     })
// }



//     module.exports = {
//         getBlog,
//         getBlogBYID,
//         createBlog,
//         updateBlog,
//         deleteBlog,
//     }