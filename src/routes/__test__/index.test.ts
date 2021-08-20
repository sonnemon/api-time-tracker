import moment from 'moment';
import request from 'supertest';
import { app } from '../../app';
import { Project } from '../../models/project';

const project1 = 'project_abc';
const project2 = 'project_xyz';

const fakeTime = async () => {
  console.log(`Fake 30min less to ${project1}`);
  const project = await Project.findOne({ name: project1 });
  if (!project) throw new Error('Error to create project');
  project.trackDate = moment()
    .subtract(30, 'minutes')
    .format('YYYY-MM-DD HH:mm:ss');
  await project.save();
};

describe('Full process', () => {
  it('open two projects', async () => {
    await request(app).put(`/project/open/${project1}`).send().expect(201);
    await request(app).put(`/project/open/${project2}`).send().expect(201);
    console.log(`Create project: ${project1}, ${project2}`);
  });

  it('close project 1', async () => {
    await fakeTime();
    await request(app).put(`/project/close/${project1}`).send().expect(201);
    console.log(`Close project: ${project1}`);
  });

  it('list projects closed', async () => {
    const result = await request(app).get(`/project`).send().expect(200);
    console.log(`List projects closed`, result.body);
    expect(1).toEqual(result.body.length);
  });

  it('get single project', async () => {
    const result = await request(app)
      .get(`/project/${project1}`)
      .send()
      .expect(200);
    console.log(`Get single project ${project1}`, result.body);
    expect(project1).toEqual(result.body.name);
  });
});
