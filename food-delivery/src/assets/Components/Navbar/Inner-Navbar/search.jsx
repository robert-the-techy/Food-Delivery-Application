function Search()
{
    return(
       <div className="ms-auto bg-white py-3 px-2 rounded-full">
            <i className="ri-search-line text-gray-500 text-md"></i>
            <input type="text" placeholder="Search food or restaurant or cuisine" className="w-100 text-sm outline-none mx-1" autoFocus/>
       </div>
    )
}
export default Search;