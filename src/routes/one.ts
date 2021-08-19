import { BadRequestError } from './../errors/bad-request';
import express, { Request, Response } from 'express';
import { Project } from '../models/project';

const router = express.Router();

router.get('/project/:name', async (req: Request, res: Response) => {
  const project = await Project.findOne({
    name: req.params.name,
  });
  if (!project) {
    throw new BadRequestError('project not exist');
  }
  res.status(200).send(project);
});
export { router as oneProjectRouter };
