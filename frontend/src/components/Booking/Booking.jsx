import React, { useContext, useState } from "react"
import "./booking.css"
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { BASE_URL } from "../../utils/config"

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour
  const navigate = useNavigate()
  const { user, token } = useContext(AuthContext)
  console.log(user, token)
  const [booking, setBooking] = useState({
    userId: user && user._id,
    useEmail: user && user.email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  })
  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    console.log(booking)
  }

  const serviceFee = 10
  const totalAmout =
    Number(price) * Number(booking.guestSize) + Number(serviceFee)

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      if (!user || user === undefined || user === null) {
        return alert("Please Sign in")
      }
      const res = await fetch(`${BASE_URL}/booking`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(booking),
      })
      const result = await res.json()
      console.log(result)
      if (!res.ok) {
        return alert(result.message)
      }
      navigate("/thank-you")
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/per person</span>
        </h3>
        <span className="tour-rating d-flex align-items-center ">
          <i class="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>
      {/* booking from  */}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>
      {/* booking from end */}

      {/* booking button */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price} <i class="ri-close-fill"></i> 1 person
            </h5>
            <span>${price}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>$10</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>${totalAmout}</span>
          </ListGroupItem>
        </ListGroup>
        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          Book Now
        </Button>
      </div>
    </div>
  )
}

export default Booking
