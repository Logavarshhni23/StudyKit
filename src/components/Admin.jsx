import Form from "../components/Form";

const Admin = ({addProducts}) => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-10">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1>
      <Form addProducts={addProducts}/>
    </div>
  );
};

export default Admin;


