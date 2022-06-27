import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database';
import { Entry, IEntry } from '../../../../models';

type Data = 
| { message: string }
| IEntry

export default function handler (req: NextApiRequest, res: NextApiResponse<Data> ) {

  switch ( req.method ) {
    case 'GET':
      return getEntryById( req, res );

    case 'PUT':
      return updateEntry( req, res );
      
    default:
      return res.status(400).json({
        message: 'El método no existe'
      })
  }

}

const getEntryById = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
  const { id } = req.query;
  await db.connect();
  const entryById = await Entry.findById( id );
  await db.disconnect();

  if( !entryById ) {
    return res.status(400).json({
      message: 'No existe una entrada con ese id ' + id
    })
  }

  return res.status(200).json( entryById );
}

const updateEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
  const { id } = req.query;
  await db.connect();

  const entryToUpdate = await Entry.findById( id );
  if( !entryToUpdate ) {
    await db.disconnect();
    return res.status(400).json({
      message: 'No existe una entrada con ese id ' + id
    })
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate( id, { description, status }, { runValidators: true, new: true });
    await db.disconnect();
    return res.status(200).json( updatedEntry! );
  } catch (error: any) {
    await db.disconnect();
    console.log(error);
    return res.status(400).json({
      message: error.errors.status.message
    })
  }


}