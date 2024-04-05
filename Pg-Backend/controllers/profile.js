const pool = require("../db");
const queries = require("../queries/profile");

const getProfile = async (req, resp) => {
  if (req.user.role === "user") {
    try {
      const results = await pool.query(queries.getProfileByUserIdOfUser, [
        req.user.id,
      ]);

      if (results.rows.length !== 1) {
        return resp.status(401).json({ message: "User not found" });
      }

      const data = results.rows[0];
      delete data.id;
      return resp.status(200).json(data);
    } catch (err) {
      console.log("Error -> ", err);
      return resp.status(500).json({ message: "Internal Server Error" });
    }
  } else if (req.user.role === "manager") {
    try {
      const results = await pool.query(queries.getProfileByUserIdOfManager, [
        req.user.id,
      ]);

      if (results.rows.length !== 1) {
        return resp.status(401).json({ message: "User not found" });
      }

      const data = results.rows[0];
      delete data.id;
      return resp.status(200).json(data);
    } catch (err) {
      console.log("Error -> ", err);
      return resp.status(500).json({ message: "Internal Server Error" });
    }
  } else if (req.user.role === "shipper") {
    try {
      const results = await pool.query(queries.getProfileByUserIdOfShipper, [
        req.user.id,
      ]);

      if (results.rows.length !== 1) {
        return resp.status(401).json({ message: "User not found" });
      }

      const data = results.rows[0];
      delete data.id;
      return resp.status(200).json(data);
    } catch (err) {
      console.log("Error -> ", err);
      return resp.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    resp.status(401).json({ message: "Invalid Role Provided" });
  }
};
const updateProfile = async (req, resp) => {
  if (req.user.role === "user") {
    const { firstname, lastname } = req.body;

    try {
      const result1 = await pool.query(queries.ifExistUserIdOfUser, [
        req.user.id,
      ]);

      if (result1.rows.length === 0) {
        try {
          const result2 = await pool.query(queries.insertProfileDataOfUser, [
            req.user.id,
            firstname,
            lastname,
          ]);
          return resp
            .status(200)
            .json({ message: "Profile Updated Succesfully" });
        } catch (err) {
          return resp
            .status(500)
            .json({ message: "Error In Profile Update, While Inserting Data" });
        }
      }

      const results = await pool.query(queries.updateProfileByUserIdOfUser, [
        firstname,
        lastname,
        req.user.id,
      ]);

      return resp.status(200).json({ message: "Profile Updated Succesfully" });
    } catch (err) {
      console.log("Error -> ", err);
      return resp.status(500).json({ message: "Error In Profile Update" });
    }
  } else if (req.user.role === "manager") {
    const { firstname, lastname } = req.body;

    try {
      const result1 = await pool.query(queries.ifExistUserIdOfManager, [
        req.user.id,
      ]);

      if (result1.rows.length !== 1) {
        try {
          const result2 = await pool.query(queries.insertProfileDataOfManager, [
            req.user.id,
            firstname,
            lastname,
          ]);
          return resp
            .status(200)
            .json({ message: "Profile Updated Succesfully" });
        } catch (err) {
          return resp
            .status(500)
            .json({ message: "Error In Profile Update, While Inserting Data" });
        }
      }

      const results = await pool.query(queries.updateProfileByUserIdOfShipper, [
        firstname,
        lastname,
        req.user.id,
      ]);

      return resp.status(200).json({ message: "Profile Updated Succesfully" });
    } catch (err) {
      console.log("Error -> ", err);
      return resp.status(500).json({ message: "Error In Profile Update" });
    }
  } else if (req.user.role === "shipper") {
    const { firstname, lastname } = req.body;

    try {
      const result1 = await pool.query(queries.ifExistUserIdOfShipper, [
        req.user.id,
      ]);

      if (result1.rows.length !== 1) {
        try {
          const result2 = await pool.query(queries.insertProfileDataOfShipper, [
            req.user.id,
            firstname,
            lastname,
          ]);
          return resp
            .status(200)
            .json({ message: "Profile Updated Succesfully" });
        } catch (err) {
          return resp
            .status(500)
            .json({ message: "Error In Profile Update, While Inserting Data" });
        }
      }

      const results = await pool.query(queries.updateProfileByUserIdOfUser, [
        firstname,
        lastname,
        req.user.id,
      ]);

      return resp.status(200).json({ message: "Profile Updated Succesfully" });
    } catch (err) {
      console.log("Error -> ", err);
      return resp.status(500).json({ message: "Error In Profile Update" });
    }
  } else {
    resp.status(500).json({ message: "Invalid Role Provided" });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
