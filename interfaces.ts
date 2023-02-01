/*____________ Comments ____________*/

interface ContentComment {
  uid: string;
  field_username: string;
  field_date: string;
  field_comment: string;
  langcode: string;
  field_email: string;
  user_picture: string;
  cid: string;
  field_count_reports_cc: string;
  field_report_reasons_cc:string;
}


interface VideoComment {
  uid: string;
  field_username_video: string;
  created: string;
  comment_body: string;
  langcode: string;
  field_comment_email: string;
  user_picture: string;
  mid: string;
  cid: string;
  field_count_reports_vc: string;
  field_report_reasons_vc:string;
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
  field_media_oembed_video: string;
  field_channel: string;
  field_channel_1: string;
  nid: string;
  field_like: string;
  field_dislike: string;

}


/*____________ Tags ____________*/

interface Tags {
  name: string;
  tid: number;

}


/*__________ Playlists __________*/

interface Playlist {
  title: string;
  field_category_playlist: string;
  body: string;
  user_picture: string;
  name: string;
  created: string;
  field_cover_image_playlist: string;
  field_cover_playlists: string;
  nid: number;
  field_video_playlist: string [];
}



/*___________ Thematics ___________*/


interface Thematics {
  nid: string;
  title: string;
  field_image_header: string;
  field_tag: string;
  created: string;
  field_teaser: string;
  field_thumbnail_article: string;
  body: string;
  field_external_links: string;
  field_external_links_1: string;
  name: string;
}

interface Thematic {
  nid: string;
  title: string;
  field_image_header: string;
  field_tag: string;
  created: string;
  field_teaser: string;
  field_thumbnail_article: string;
  body: string;
  field_external_links: string;
  field_external_links_1: string;
  user_picture: string;
  name: string;
}


/*____________ Channel ____________*/

interface Channel {

  nid: string;
  title: string;
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
  field_media_oembed_video: string;
  nid: string;
}


/*____________ Likes / Dislikes ____________*/

interface Likes {
  entity_id: string;
  id: string;
  entity_type: string;
  count: string;
}

/*____________ Report ____________*/

interface Reason {
  name: string;
}

/*____________ Terms ____________*/

interface Terms {
  name: string;
  tid: number;
}

