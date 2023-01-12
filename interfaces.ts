
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


/*____________ Video ____________*/

interface Video {
  mid: string;
  field_video_title: string;
  created: string;
  field_video_description: string;
  field_duration: string;
  thumbnail__target_id: string;
  user_picture: string;
  name_1: string;
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

/*____________ Channel ____________*/

interface Channel {

  nid: string;
  title: string;
  field_biography: string;
  field_channel_cover: string;
  name: string;
  user_picture: string;
  field_logo: string;
  field_description: string;
}

/*____________All videos from one Channel ____________*/

interface ChannelVideos {

  mid: string;
  field_video_title: string;
  created: string;
  field_duration: string;
  thumbnail__target_id: string;
  user_picture: string;
  name: string;
  field_media_oembed_video:string;
}

/*____________ Likes / Dislikes ____________*/

interface Likes {
  entity_id:string;
  id:string;
  entity_type:string;
  count:string;
}


