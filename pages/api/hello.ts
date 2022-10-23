// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// type Quantity  = 50 |100;

// let quantity: Quantity = 100
// type Metric = 'cm'  | 'inch'
function greet(name: string | undefined): string {
  if (name)
    console.log(name.toUpperCase())
  else
    console.log("is empty")
  return "true"
}

type Draggable = {
  drag: () => void
}

type Resizable = {
  resize: () => void
}

type UIWidget = Draggable & Resizable;
let textBox: UIWidget = {
  drag: () => { },
  resize: () => { }
}

textBox.drag()
textBox.resize()

function kgToLbs(wheight: number | string): number  {
  //narrowing
  if (typeof wheight === 'number')
    return wheight * 2.2
  else
    return parseInt(wheight) * 2.2
}

type Data = {
  name: string,
  employee: object,
  wheight: string
}

type Employee = {
  readonly id: number,
  name?: string,
  retire: (date: Date) => void
}

let employee: Employee = {
  id: 1,
  retire: (date: Date) => {
    console.log(date)
  }
}
employee.name = "mehran"

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query: object = req.query
  console.log(query)
  greet("Mehran")
  greet(undefined)

  res.status(200).json({ name: 'John Doe', employee: employee, wheight: kgToLbs("20kg") + 'lbs' })
}
