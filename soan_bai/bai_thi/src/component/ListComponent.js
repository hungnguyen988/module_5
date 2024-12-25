import React, {useEffect, useRef} from 'react';
import {searchProductByNameAndCategory} from "../service/product/ProductService";
import {getAllCategories} from "../service/category/CategoryService";


function ListComponent() {

    const [products, setProducts] = React.useState(null);
    const [categoryId, setCategoryId] = React.useState("");

    const [categories, setCategories] = React.useState([]);
    const [searchName, setSearchName] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const searchNameRef = useRef("");
    const searchCategoryIdRef = useRef("");


    const fetchProducts = async () => {
        const response = await searchProductByNameAndCategory(searchName, categoryId)
        setProducts(response);

    }

    useEffect(() => {
        fetchProducts();
    }, [searchName, categoryId]);

    useEffect(() => {
        const fetchCategories = async () => {
            const list = await getAllCategories();
            setCategories(list);
        }
        fetchCategories();
    },[])

    const handleOnClickSearch = () => {
        let name = searchNameRef.current.value;
        let categoryId = searchCategoryIdRef.current.value;
        setSearchName(name);
        setCategoryId(categoryId);
        fetchProducts();
    }

    if (!products) return <h1>Loading...</h1>

    return (
        <>
            <div className="container my-4">
                <h1 className="text-center mb-4">Danh sách sản phẩm</h1>

                <div className="form-inline mb-3">
                    <input
                        ref={searchNameRef}
                        className="form-control mr-2"
                        type="text"
                        placeholder="Nhập tên sản phẩm"
                    />
                    <select ref={searchCategoryIdRef} className="form-control mr-2">
                        <option value="">Tất cả</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleOnClickSearch} className="btn btn-primary">
                        Tìm kiếm
                    </button>
                </div>
            </div>



            {products.length === 0 ? (
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="alert alert-warning" role="alert">
                                <h4 className="alert-heading">
                                    <i className="fas fa-exclamation-triangle mr-2"></i>
                                    Không tìm thấy sản phẩm!
                                </h4>
                                <p className="mb-0">Không có sản phẩm nào phù hợp với tìm kiếm của bạn.</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-hover table-bordered">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col" className="text-center">STT</th>
                            <th scope="col">Mã sản phẩm</th>
                            <th scope="col">Tên</th>
                            <th scope="col" className="text-right">Giá</th>
                            <th scope="col" className="text-center">Số lượng</th>
                            <th scope="col">Ngày nhập</th>
                            <th scope="col">Loại sản phẩm</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id}>
                                <th scope="row" className="text-center">{index + 1}</th>
                                <td>{product.code}</td>
                                <td>{product.name}</td>
                                <td className="text-right">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</td>
                                <td className="text-center">{product.quantity}</td>
                                <td>{new Date(product.createAt).toLocaleDateString('vi-VN')}</td>
                                <td>{product.category.name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

        </>
    )
}

export default ListComponent;