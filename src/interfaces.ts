
/*____________ Comments ____________*/

interface ContentComment
{
  uid : string;
  field_username: string;
  field_date : string;
  field_comment: string;
  langcode: string;
  field_email: string;
  user_picture: string;

}

export {ContentComment};



interface VideoComment
{
  uid : string;
  field_username_video: string;
  created : string;
  comment_body: string;
  langcode: string;
  field_comment_email: string;
  user_picture: string;

}

export {VideoComment};
