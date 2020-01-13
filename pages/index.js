import React,{useState} from 'react'
import axios from 'axios'
import Head from 'next/head'
import TestComponent from '../components/TestComponent'

const Index = ({arrList, movieList})=>{
    const [arrTest, setArrTest] = useState(arrList)
    const [movies, setMovies] = useState(movieList)
    return(
        <div>
            <Head>
                <title>여기는 인덱스 페이지</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                    key="viewport"/>
                <meta name="og:title" content={movieList[0].movieNm} />
                <meta name="og:description" content={`이것은 영화의 리스트를 뭐시기 하는 것으로 1등은 ${movieList[0].movieNm}이 가져갔다`} />
                <meta name="keyword" content={movieList.map((el)=> {return el.movieNm})} />
                <meta name="og:image" content="https://i.ytimg.com/vi/casKW6T63Ko/maxresdefault.jpg" />
                <meta name="og:url" content="http://localhost:8081" />    
                <meta name="twitter:card" content="summary" />
            </Head>
            <ul>
                {
                    arrTest.map((el, i)=> {
                        return(
                            <TestComponent key = {i} value = {el} />
                        )
                    })
                }
            </ul>
            <table>
                <thead>
                    <tr>
                        <td>랭킹</td>
                        <td>영화이름</td>
                        <td>개봉일</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        movies.map((el)=>{
                            return(
                                <tr>
                                    <td>
                                        {el.rank}
                                    </td>
                                    <td>
                                        {el.movieNm}
                                    </td>
                                    <td>
                                        {el.movieCd}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
Index.getInitialProps = async(context)=>{
    const arrList = ["test", "getinitial", "서버사이드렌더링"]
    const datas = await axios.get('http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=430156241533f1d058c603178cc3ca0e&targetDt=20120101');
    
    return {arrList, movieList : datas.data.boxOfficeResult.dailyBoxOfficeList}
}

export default Index;