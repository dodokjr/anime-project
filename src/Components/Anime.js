import React, { useEffect, useState } from "react";
import { AnimeInfo } from "./AnimeInfo";
import { AnimeList } from "./AnimeList";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
function Anime()
{
    const [search, setSearch] = useState('c')
    const [animeData, setAnimeData] = useState([]);
    const [animeInfo, setAnimeInfo] = useState();
    const [myAnimeList, setMyAnimeList] = useState([]);

    const addTo = (anime) =>
    {
        const index = myAnimeList.findIndex((myanime) =>
        {
            return myanime.mal_id === anime.mal_id
        })
        if (index < 0)
        {
            const newArray = [...myAnimeList, anime]
            setMyAnimeList(newArray);
        }

    }
    const removeFrom = (anime) =>
    {
        const newArray = myAnimeList.filter((myanime) =>
        {
            return myanime.mal_id !== anime.mal_id
        })
        setMyAnimeList(newArray)
    }
    const getData = async () =>
    {
        const res = await fetch(`https://api-mfikria.vercel.app/v2/anime/${search}`)
        const resData = await res.json();
        setAnimeData(resData.data)
    }
    useEffect(() =>
    {
        getData()
    }, [search])

    return (
        <>
            <br />
            <section id="anime" className="anime">
                <Container>
                    <h5>list Anime By jikan</h5>
                    <div>
                        <hr />
                        <InputGroup className="mb-3" name="search" type="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search Your Anime" required>
                            <Form.Control
                                placeholder="Seacrh your Anime"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                    </div>
                    {/* {animeInfo && <AnimeInfo animeInfo={animeInfo} />} */}
                    <hr />
                    <Row xs={1} md={2} className="g-4">
                        <AnimeList
                            animelist={animeData}
                            setAnimeInfo={setAnimeInfo}
                            handleList={(anime) => addTo(anime)}
                        />
                        <AnimeList
                            animelist={myAnimeList}
                            setAnimeInfo={setAnimeInfo}
                            handleList={(anime) => removeFrom(anime)}
                        />
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default Anime;
