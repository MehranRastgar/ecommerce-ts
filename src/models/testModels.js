import { Schema, model, models } from "mongoose";

const testSchema = new Schema({
  name: String,

  email: {
    type: String,

    required: true,

    unique: true,
  },
});

const Test = models.Test || model("Test", testSchema);

export default Test;

function AddressListComponent(props) {
  async function AddressList(user_id, login_token, uri_api) {
    const resAdd = await axios.post(`${uri_api}`, {
      header: {
        user_id: user_id,
        token: login_token,
      },
    });

    console.log(resAdd.data);
  }

  useEffect(() => {
    AddressList();
  }, []);

  return <div>آدرس</div>;
}
