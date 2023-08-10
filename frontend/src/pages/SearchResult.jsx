import React, { useState } from 'react'
import CommonSection from './../shared/Commonsection'
import { useLocation } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import TourCard from './../shared/TourCard'
import Newsletter from '../shared/Newsletter'

const SearchResult = () => {
  const location = useLocation()
  const [data]= useState(location.state)
  console.log(data)
  return (
    <>
      <CommonSection title={'Tour Search Result'} />
      <section>
        <Container>
          <Row>
            {data.length===0? <h4 className='text-center'>No tour found</h4>
            :
            data?.map(tour=><Col lg='3' className='mb-4' key={tour._id}><TourCard tour={tour} /></Col>) }
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  )
}

export default SearchResult
