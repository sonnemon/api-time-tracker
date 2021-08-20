import express, { Request, Response } from 'express';
import { Project } from '../models/project';
import { BadRequestError } from './../errors/bad-request';
import { PROJECT_STATUS } from './../types';
import moment from 'moment';

const router = express.Router();

router.put(
  '/project/close/:nameProject',
  async (req: Request, res: Response) => {
    const project = await Project.findOne({ name: req.params.nameProject });
    if (!project) {
      throw new BadRequestError('project not exist');
    }
    if (project.currentStatus == PROJECT_STATUS.CLOSE) {
      throw new BadRequestError('project is already close');
    }

    const now = moment(new Date());

    const minDiff = moment
      .duration(now.diff(moment(project.trackDate)))
      .asMinutes();
    const minRoud = Math.round(minDiff);

    project.totalTime = project.totalTime + minRoud;
    project.currentStatus = PROJECT_STATUS.CLOSE;
    project.trackDate = moment().format('YYYY-MM-DD HH:mm:ss');
    project.segments.push({
      dateClose: moment().format('YYYY-MM-DD HH:mm:ss'),
      spendTime: minRoud,
    });
    project.save();
    res.status(201).send(project);
  }
);
export { router as closeProjectRouter };
