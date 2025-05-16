import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Issue title is required"],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Issue description is required"],
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved", "closed"],
      default: "open",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    attachments: [String], // array of URLs
    tags: [String],
    dueDate: {
      type: Date,
    },
   

status: {
  type: String,
  enum: ["Open", "In Progress", "Resolved", "Closed"],
  default: "Open"
},
priority: {
  type: String,
  enum: ["Low", "Medium", "High", "Critical"],
  default: "Medium"
},

  },
  {timestamps: true}
);

export const Issue = mongoose.model("Issue", issueSchema);

