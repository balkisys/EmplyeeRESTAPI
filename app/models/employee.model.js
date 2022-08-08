module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: String,
      firstName: String,
      dateCreated: { type: Date, default: Date.now },
      department: String,
    },
  );
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const employee = mongoose.model("employee", schema);
  return employee;
};
