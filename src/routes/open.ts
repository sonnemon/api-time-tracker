import express, { Request, Response } from 'express';
import { Project } from '../models/project';
import { BadRequestError } from './../errors/bad-request';
import { PROJECT_STATUS } from './../types';
import moment from 'moment';

const router = express.Router();

router.put(
  '/project/open/:nameProject',
  async (req: Request, res: Response) => {
    const project = await Project.findOneOrCreate(
      {
        name: req.params.nameProject,
      },
      {
        name: req.params.nameProject,
        totalTime: 0,
        currentStatus: PROJECT_STATUS.CLOSE,
        trackDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      }
    );
    if (project.currentStatus == PROJECT_STATUS.OPEN) {
      throw new BadRequestError('project is already open');
    }
    project.trackDate = moment().format('YYYY-MM-DD HH:mm:ss');
    project.currentStatus = PROJECT_STATUS.OPEN;
    project.save();
    res.status(201).send(project);
  }
);
export { router as openProjectRouter };
