import React from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
// import Loading from "../../Components/Loading";
// import Error404 from "../../Components/Error404";
import { Player } from "@lottiefiles/react-lottie-player";
import recipes, * as recipesSlices from "../../slices/home";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading";

export default function SearchRecipe() {
  const state = useSelector((state) => state);

  const [loading, setLoading] = React.useState(undefined);
  const [searchR, setSearchR] = React.useState(undefined);
  const [search, setSearch] = React.useState("");
  const [listRecipe, setListRecipe] = React.useState(undefined);
  const [mesgError, setMesgerror] = React.useState(null);

  // console.log(state)

  const initPage = async () => {
    try {
      setLoading(true);
      const list = await axios({
        method: "get",
        url: `${window.env.BE_URL}/home/list`,
      });
      // console.log(list.data.data)
      setListRecipe(list.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTanyaButton = async () => {
    try {
      setLoading(true);

      const result = await axios({
        method: "get",
        url: `${window.env.BE_URL}/recipes/search?title=${search || "%"}`,
      });

      setSearchR(result.data.data.search);
      //   console.log(result.data.data.search);
    } catch (error) {
      if (error.response.status === 502) {
        setMesgerror("Something wrong in our server");
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    initPage();
  }, [searchR]);

  return (
    <div id="SearchPage">
      <Navbar />

      {/* Search Header */}

      <div className="container mx-auto" style={styles.body}>
        {mesgError ? (
          <div className="alert alert-danger" role="alert">
            {mesgError}
          </div>
        ) : null}
        <Player
          autoplay
          loop
          src="/lotties/search.json"
          style={{ height: "300px", width: "300px" }}
        ></Player>
        <div className="mx-auto p-2" style={styles.searchTitle}>
          Cari apa, tanya mama 🙂
        </div>
        <div
          className="mx-auto"
          style={{
            width: "85%",
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <input
            className="form-control px-2 py-1"
            style={{ height: "53px", borderRadius: 50, borderWidth: 2 }}
            type="search"
            name="search"
            id="search"
            placeholder="Mau cari resep apa...?"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn"
            onClick={handleTanyaButton}
            style={styles.searchButton}
          >
            Tanya
          </button>
        </div>
      </div>

      {/* Search Content */}
      {/* For Recipe Content */}
      {loading ? (
        <Loading />
      ) : searchR ? null : (
        <div className="container my-4" style={{ margin: "0 auto" }}>
          <div
            className="mx-auto p-2"
            style={{ fontWeight: 900, fontSize: 24 }}
          >
            Result ✨
          </div>
          <div className="row">
            {listRecipe?.map((recipe, index) => {
              return (
                <div
                  key={index}
                  className="col-lg-4 col-md-5 col-sm-6 col-xs-12 p-3 "
                >
                  <Link
                    to={`/detail/${String(recipe.title)
                      .split(" ")
                      .join("-")
                      .toLowerCase()}`}
                  >
                    <div
                      style={{
                        ...styles.resultCard,
                        backgroundImage: `url(${recipe.image})`,
                      }}
                    >
                      <div
                        className="p-3"
                        style={styles.resultCardTitleContainer}
                      >
                        <p style={styles.resultCardTitle}>{recipe.title}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* For Recipe Content */}
      {loading ? (
        <Loading />
      ) : !searchR ? null : (
        <div className="container my-4" style={{ margin: "0 auto" }}>
          <div
            className="mx-auto p-2"
            style={{ fontWeight: 900, fontSize: 24 }}
          >
            Resep populer ✨
          </div>
          <div className="row">
            {searchR?.map((recipe, index) => {
              return (
                <div
                  key={index}
                  className="col-lg-4 col-md-5 col-sm-6 col-xs-12 p-3 "
                >
                  <Link
                    to={`/detail/${String(recipe.title)
                      .split(" ")
                      .join("-")
                      .toLowerCase()}`}
                  >
                    <div
                      style={{
                        ...styles.resultCard,
                        backgroundImage: `url(${recipe.image})`,
                      }}
                    >
                      <div
                        className="p-3"
                        style={styles.resultCardTitleContainer}
                      >
                        <p style={styles.resultCardTitle}>{recipe.title}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* End of Search Content */}

      <Footer />
    </div>
  );
}

const styles = {
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  searchTitle: {
    fontWeight: 900,
    fontSize: 24,
    marginTop: -70,
  },
  searchButton: {
    backgroundColor: "var(--recipe-color-yellow)",
    width: 120,
    borderRadius: 50,
    fontWeight: 800,
    color: "white",
  },
  resultCard: {
    height: "160px",
    backgroundPosition: "center",
    backgroundSize: "100%",
    objectFit: "cover",
    objectPosition: "center",
    display: "flex",
    flexDirection: "column-reverse",
    borderRadius: 20,
  },
  resultCardTitleContainer: {
    backgroundColor: "#00000055",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  resultCardTitle: {
    textWrap: "wrap",
    fontSize: "18px",
    fontWeight: 600,
    margin: "unset",
    color: "white",
  },
};
