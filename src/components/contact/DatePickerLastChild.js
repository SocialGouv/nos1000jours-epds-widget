import React from "react"
import { Form } from "react-bootstrap"

export function DatePickerLastChild({ onChange }) {
  return (
    <div className="date-picker">
      <Form.Group controlId="input-date">
        <Form.Label>Date de naissance de votre enfant le plus jeune :</Form.Label>
        <div className="input-date-picker-block">
          <Form.Control
            className="input-date-picker"
            type="date"
            name="input-date"
            onChange={(e) => {
              // La valeur récupérée est sous la forme : yyyy-mm-dd
              onChange(e.target.value)
            }}
          />
        </div>
      </Form.Group>
    </div>
  )
}
