module.exports.cvForms = {
  id: 'cv',
  sections:
  [
    
    {
      id: "titlesection",
      page: "cv",
      api: "/api/cv/",
      fields:
      [
        {
          entryName: "title",
          entryTrad: "CvFormNameLabel",
          entryType: "text",
          localized: false
        }
      ]
    },
    {
      id: "infosection",
      page: "cv",
      api: "/api/infos/",
      fields:
      [
         
        {
          entryName: "name",
          entryTrad: "CvPersonNameLabel",
          entryType: "text",
          localized: false
        },
        {
          entryName: "birthdate",
          entryTrad: "CvPersonBirthdateLabel",
          entryType: "text",
          localized: false
        }
      ]
    }
  ]
}
