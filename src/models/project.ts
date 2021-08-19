import mongoose, { Schema } from 'mongoose';

/*
  An interface that describes the properties 
  that are requeried to create a new Project
*/

interface ProjectAttrs {
  name: string;
  currentStatus: string;
  totalTime: number;
  trackDate: string;
}
/* 
  An interface that describes the properties
  that a Project Model has
*/

interface ProjectModel extends mongoose.Model<ProjectDoc> {
  build(attrs: ProjectAttrs): ProjectDoc;
  findOneOrCreate(
    condition: FindOrCreateAttrs,
    attrs: ProjectAttrs
  ): ProjectDoc;
}

/*
  An interface that describes the properties
  thar a Project Document has
*/

interface ProjectDoc extends mongoose.Document {
  id: string;
  name: string;
  currentStatus: string;
  totalTime: number;
  trackDate: string;
  segments: {
    dateClose: string;
    spendTime: number;
  }[];
}

interface FindOrCreateAttrs {
  name: string;
}

export const segmentSchema = new Schema(
  {
    dateClose: {
      type: String,
      required: true,
    },
    spendTime: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    currentStatus: {
      type: String,
      required: true,
    },
    trackDate: {
      type: String,
      require: true,
    },
    totalTime: {
      type: Number,
      required: true,
    },
    segments: [segmentSchema],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.trackDate;
        delete ret._id;
      },
    },
  }
);

projectSchema.statics.build = (attrs: ProjectAttrs) => {
  return new Project(attrs);
};

projectSchema.statics.findOneOrCreate = async (
  condition: FindOrCreateAttrs,
  attrs: ProjectAttrs
) => {
  const one = await Project.findOne(condition);
  if (one) {
    return one;
  } else {
    return await Project.create(attrs);
  }
};

const Project = mongoose.model<ProjectDoc, ProjectModel>(
  'Project',
  projectSchema
);

export { Project };
