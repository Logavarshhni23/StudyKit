const Footer = () => {
    return(
        <div className="bg-rose-900 text-white flex flex-col md:flex-row justify-around p-10 mx-auto w-full">
            <div>
                <h2 className="text-5xl font-bold text-white mb-3">StudyKit</h2>
                <p className="text-gray-900 w-full sm:w-[250px]">Your one-stop shop for latest gadgets, electronics, and accessories.</p>
            </div>
            <div>
                <h3>Quick Links</h3>
                <ul className="text-gray-900">
                    <li className="hover:cursor-pointer hover:text-white my-2">Home</li>
                    <li className="hover:cursor-pointer hover:text-white my-2">Products</li>
                    <li className="hover:cursor-pointer hover:text-white my-2">Blog</li>
                    <li className="hover:cursor-pointer hover:text-white my-2">Contact</li>
                </ul>
            </div>
            <div>
                <h3>Customer Service</h3>
                <ul className="text-gray-900">
                    <li className="hover:cursor-pointer hover:text-white my-2">Help Center</li>
                    <li className="hover:cursor-pointer hover:text-white my-2">Returns</li>
                    <li className="hover:cursor-pointer hover:text-white my-2">Shipping Info</li>
                    <li className="hover:cursor-pointer hover:text-white my-2">Track Order</li>
                </ul>
            </div>
            <div>
                <h3>Newsletter</h3>
                <p className="text-gray-900 hover:cursor-pointer hover:text-white my-2">Subscribe for latest Offers</p>
                <div>
                    <input type="email" placeholder="Enter your email" className="p-2 border text-white" />
                    <button className="bg-rose-500 p-2 hover:bg-red-700">Subscribe</button>
                </div>
            </div>
        </div>
    )
}
export default Footer;