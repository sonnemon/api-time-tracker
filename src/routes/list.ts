import express, { Request, Response } from 'express';
import { Project } from '../models/project';
import { PROJECT_STATUS } from './../types';

const router = express.Router();

router.get('/project', async (req: Request, res: Response) => {
  const projects = await Project.find({
    currentStatus: PROJECT_STATUS.CLOSE,
  }).select('name currentStatus totalTime');
  res.status(200).send(projects);
});
export { router as listProjectRouter };
