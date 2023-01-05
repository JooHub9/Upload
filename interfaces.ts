
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


interface VideoComment
{
  uid : string;
  field_username_video: string;
  created : string;
  comment_body: string;
  langcode: string;
  field_comment_email: string;
  user_picture: string;
  mid:string;

}


/*____________ Video____________*/

interface Video {
  mid: string;
  field_video_title: string;
  created: string;
  field_video_description: string;
  field_duration: string;
  thumbnail__target_id: string;
  user_picture: string;
  field_tags: string;
  field_media_oembed_video:string;
  field_channel: string;
  field_like:string;
  field_dislike:string;
}

/*____________ Tags ____________*/
interface Tags {
  name:string;
}



