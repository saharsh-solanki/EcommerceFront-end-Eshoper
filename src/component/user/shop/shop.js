import React, { useEffect } from "react";
import PageHeader, { useQuery } from "../../../utils/base";
import Header from "../home/header";
import Footer from "../home/footer";
import { useSelector } from "react-redux";
import { ProductApi } from "../../../api/shop/shop";
import { SingleProduct } from "./singleProduct";
export default function Shop() {
  const queryParams = useQuery();
  const search = queryParams.get("search") ? queryParams.get("search") : "";
  const category = queryParams.get("category")
    ? queryParams.get("category")
    : "";

  const data = useSelector((state) => {
    return state.HomePageReducer.data;
  });
  const [filterState, setfilterState] = React.useState({
    filters: {
      priceFilterCheckbox: [],
      ColorFilterCheckbox: [],
      SizeFilterCheckbox: [],
      page: null,
      ordering: null,
      search: search,
      minPrice: null,
      maxPrice: null,
      category: category,
    },
  });
  const [productDataState, setproductDataState] = React.useState([]);
  const [paginationData, SetpaginationData] = React.useState({});
  const [currentPage, SetcurrentPage] = React.useState(0);
  const handleStateChangePrice = (event) => {
    var targetname = event.target.name;
    if (event.target.checked) {
      setfilterState({
        filters: {
          ...filterState.filters,
          [targetname]: [
            ...filterState.filters.priceFilterCheckbox,
            event.target.value,
          ],
        },
      });
    } else {
      setfilterState({
        filters: {
          ...filterState.filters,
          priceFilterCheckbox: filterState.filters.priceFilterCheckbox.filter(
            (filterValue) => filterValue != event.target.value
          ),
        },
      });
    }
  };
  const handleStateChangeColor = (event) => {
    var targetname = event.target.name;
    if (event.target.checked) {
      setfilterState({
        filters: {
          ...filterState.filters,
          [targetname]: [
            ...filterState.filters.ColorFilterCheckbox,
            event.target.value,
          ],
        },
      });
    } else {
      setfilterState({
        filters: {
          ...filterState.filters,
          ColorFilterCheckbox: filterState.filters.ColorFilterCheckbox.filter(
            (filterValue) => filterValue != event.target.value
          ),
        },
      });
    }
  };
  const handleStateChangeSize = (event) => {
    var targetname = event.target.name;
    if (event.target.checked) {
      setfilterState({
        filters: {
          ...filterState.filters,
          [targetname]: [
            ...filterState.filters.SizeFilterCheckbox,
            event.target.value,
          ],
        },
      });
    } else {
      setfilterState({
        filters: {
          ...filterState.filters,
          SizeFilterCheckbox: filterState.filters.SizeFilterCheckbox.filter(
            (filterValue) => filterValue != event.target.value
          ),
        },
      });
    }
  };
  const handleStateChangePirceRange = (event) => {
    var targetname = event.target.name;
    var value = event.target.value;
    if (value) {
      setfilterState({
        filters: {
          ...filterState.filters,
          [targetname]: value,
        },
      });
    } else {
      setfilterState({
        filters: {
          ...filterState.filters,
          [targetname]: null,
        },
      });
    }
  };
  const handleStateChangeOrdering = (event) => {
    const Target = event.target.attributes.filterBy.value;
    if (Target) {
      if (Target) {
        setfilterState({
          filters: {
            ...filterState.filters,
            ordering: Target,
          },
        });
      }
    }
  };

  const handleStateChangeSearch = (event) => {
    const Target = event.target.value;

    setfilterState({
      filters: {
        ...filterState.filters,
        search: Target,
      },
    });
  };
  // handle change
  useEffect(() => {
    setfilterState({
      filters: {
        ...filterState.filters,
        search: search,
      },
    });
  }, [search]);

  useEffect(() => {
    setfilterState({
      filters: {
        ...filterState.filters,
        category: category,
      },
    });
  }, [category]);

  useEffect(async () => {
    const data = await changeProductByStates();

    const result = await ProductApi(data);
    setproductDataState(result.data.results);
    SetpaginationData({
      next: result.data.next,
      previous: result.data.previous,
    });
  }, [filterState]);

  useEffect(async () => {
    const data = await changeProductByStates();
    if (currentPage !== 0) {
      data["page"] = currentPage;
    }
    const result = await ProductApi(data);
    setproductDataState(result.data.results);
    SetpaginationData({
      next: result.data.next,
      previous: result.data.previous,
    });
  }, [currentPage]);

  const changeProductByStates = () => {
    var data = {};
    var price = filterState.filters.priceFilterCheckbox;
    var size = filterState.filters.SizeFilterCheckbox;
    var color = filterState.filters.ColorFilterCheckbox;
    var ordering = filterState.filters.ordering;
    var search = filterState.filters.search;
    var category = filterState.filters.category;
    var min = filterState.filters.minPrice;
    var max = filterState.filters.maxPrice;
    if (color.length !== 0) {
      data["colors"] = color;
    }
    if (size.length !== 0) {
      data["sizes"] = size;
    }
    if (ordering) {
      data["ordering"] = ordering;
    }
    if (search) {
      data["search"] = search;
    }
    if (category) {
      data["category"] = [category];
    }
    if (min && max) {
      data["minPrice"] = min;
      data["maxPrice"] = max;
    }

    return data;
  };

  return (
    <div>
      <Header></Header>
      <PageHeader></PageHeader>
      <div class="container-fluid pt-5">
        <div class="row px-xl-5">
          {/* <!-- Shop Sidebar Start --> */}
          <div class="col-lg-3 col-md-12">
            {/* <!-- Price Start --> */}
            <div class="border-bottom mb-4 pb-4">
              <h5 class="font-weight-semi-bold mb-4">Filter by price</h5>
              <form>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    checked
                    id="price-all"
                  />
                  <label class="custom-control-label" for="price-all">
                    All Price
                  </label>
                  <span class="badge border font-weight-normal">1000</span>
                </div>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    name="minPrice"
                    class="form-control"
                    type={"text"}
                    placeholder={"0 Rs"}
                    value={filterState.filters.minPrice}
                    onChange={handleStateChangePirceRange}
                  />
                  <input
                    name="maxPrice"
                    class="form-control"
                    type={"text"}
                    value={filterState.filters.maxPrice}
                    placeholder={"100000 Rs"}
                    onChange={handleStateChangePirceRange}
                  />
                </div>
                {/* <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    name="priceFilterCheckbox"
                    type="checkbox"
                    class="custom-control-input"
                    id="price-1"
                    value={"0-100"}
                    min={"0"}
                    max={"100"}
                    onClick={handleStateChangePirceRange}
                  />
                  <label class="custom-control-label" for="price-1">
                    Rs. 0 - $100
                  </label>
                  <span class="badge border font-weight-normal">150</span>
                </div>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="price-2"
                    name="priceFilterCheckbox"
                    value={"100-200"}
                    min={"100"}
                    max={"200"}
                    onClick={handleStateChangePirceRange}
                  />
                  <label class="custom-control-label" for="price-2">
                    RS . 100 - $200
                  </label>
                  <span class="badge border font-weight-normal">295</span>
                </div>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    // type="checkbox"
                    class="custom-control-input"
                    id="price-3"
                    value={"200-300"}
                    min={"200"}
                    max={"300"}
                    onClick={handleStateChangePirceRange}
                  />
                  <label class="custom-control-label" for="price-3">
                    $200 - $300
                  </label>
                  <span class="badge border font-weight-normal">246</span>
                </div>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="price-4"
                  />
                  <label class="custom-control-label" for="price-4">
                    $300 - $400
                  </label>
                  <span class="badge border font-weight-normal">145</span>
                </div>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="price-5"
                  />
                  <label class="custom-control-label" for="price-5">
                    $400 - $500
                  </label>
                  <span class="badge border font-weight-normal">168</span>
                </div> */}
              </form>
            </div>
            {/* <!-- Price End --> */}

            {/* <!-- Color Start --> */}
            <div class="border-bottom mb-4 pb-4">
              <h5 class="font-weight-semi-bold mb-4">Filter by color</h5>
              <form>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    checked
                    id="color-all"
                  />
                  <label class="custom-control-label" for="price-all">
                    All Color
                  </label>
                  <span class="badge border font-weight-normal">1000</span>
                </div>
                {data.colors_for_fillter
                  ? data.colors_for_fillter.map((color) => {
                      return (
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id={color + "1"}
                            name={"ColorFilterCheckbox"}
                            onClick={handleStateChangeColor}
                            value={color}
                          />
                          <label class="custom-control-label" for={color + "1"}>
                            {color}
                          </label>
                          <span class="badge border font-weight-normal">
                            150
                          </span>
                        </div>
                      );
                    })
                  : ""}
              </form>
            </div>
            {/* <!-- Color End --> */}

            {/* <!-- Size Start --> */}
            <div class="mb-5">
              <h5 class="font-weight-semi-bold mb-4">Filter by size</h5>
              <form>
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    checked
                    id="size-all"
                  />
                  <label class="custom-control-label" for="size-all">
                    All Size
                  </label>
                  <span class="badge border font-weight-normal">1000</span>
                </div>
                {data.sizes_for_fillter
                  ? data.sizes_for_fillter.map((size) => {
                      return (
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id={size + "1"}
                            name={"SizeFilterCheckbox"}
                            onClick={handleStateChangeSize}
                            value={size}
                          />
                          <label class="custom-control-label" for={size + "1"}>
                            {size}
                          </label>
                          <span class="badge border font-weight-normal">
                            150
                          </span>
                        </div>
                      );
                    })
                  : ""}
              </form>
            </div>
            {/* <!-- Size End --> */}
          </div>
          {/* <!-- Shop Sidebar End --> */}

          {/* <!-- Shop Product Start --> */}
          <div class="col-lg-9 col-md-12">
            <div class="row pb-3">
              <div class="col-12 pb-1">
                <div class="d-flex align-items-center justify-content-between mb-4">
                  <form action="">
                    <div class="input-group">
                      <input
                        onChange={handleStateChangeSearch}
                        value={filterState.filters.search}
                        type="text"
                        class="form-control"
                        placeholder="Search by name"
                      />
                      <div class="input-group-append">
                        <a class="input-group-text bg-transparent text-primary">
                          <i class="fa fa-search"></i>
                        </a>
                      </div>
                    </div>
                  </form>
                  <div class="dropdown ml-4">
                    <button
                      class="btn border dropdown-toggle"
                      type="button"
                      id="triggerId"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Sort by
                    </button>
                    <div
                      class="dropdown-menu dropdown-menu-right"
                      aria-labelledby="triggerId"
                    >
                      <button
                        value={"Latest"}
                        filterBy="id"
                        class="dropdown-item"
                        onClick={handleStateChangeOrdering}
                      >
                        Latest
                      </button>
                      <butto
                        onClick={handleStateChangeOrdering}
                        class="dropdown-item"
                        filterBy="-id"
                      >
                        Oldest
                      </butto>
                      <button
                        onClick={handleStateChangeOrdering}
                        class="dropdown-item"
                        filterBy="price"
                      >
                        Low To High
                      </button>
                      <button
                        onClick={handleStateChangeOrdering}
                        class="dropdown-item"
                        filterBy="-price"
                      >
                        High To Low
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {productDataState
                ? productDataState.map((product) => {
                    return <SingleProduct product={product}></SingleProduct>;
                  })
                : "Loading"}

              {console.log(paginationData)}
              <div class="col-12 pb-1">
                <nav aria-label="Page navigation">
                  <ul class="pagination justify-content-center mb-3">
                    {paginationData.previous ? (
                      <li class="page-item ">
                        <button
                          class="page-link"
                          aria-label="Previous"
                          onClick={(eve) => {
                            console.log(paginationData.previous);
                            SetcurrentPage(paginationData.previous);
                          }}
                          id="previous"
                        >
                          <span aria-hidden="true">&laquo; Pre</span>
                          <span class="sr-only">Previous</span>
                        </button>
                      </li>
                    ) : (
                      ""
                    )}
                    {paginationData.next ? (
                      <li class="page-item">
                        <button
                          onClick={(eve) => {
                            SetcurrentPage(paginationData.next);
                          }}
                          id="next"
                          validatedName={""}
                          class="page-link"
                          aria-label="Next"
                        >
                          <span aria-hidden="true"> Next &raquo;</span>
                          <span class="sr-only">Next</span>
                        </button>
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
