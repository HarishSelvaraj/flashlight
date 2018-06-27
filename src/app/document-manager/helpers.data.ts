export const ResponsiveTableHelpers = {
    header : [
          {
              name:'S.NO',
              key:'id',
              order:'asc'
          },
          {
              name:'BASE NAME',
              key: 'basename',
              order:'asc'
          },
          {
              name:'DATABASE',
              key:'database',
              order:'asc'
          },
          {
              name:'OBJECT',
              key:'object',
              order:'asc'
          },
          {
            name:'FORM TYPE',
            key:'formtype',
            order:'asc'
        },
        {
            name:'ACTION',
            key:'action',
            order:'asc'
        }
      ],
      rows : [{
          id: "01",
          basename: "Base Name 1",
          database: "Database 1",
          object: "Table Name",
          formtype: "Document Type 1",
          action: '<i class="nb-edit"></i>'
      },{
          id: "02",
          basename: "Base Name 2",
          database: "Database 2",
          object: "View",
          formtype: "Document Type 2",
          action: '<i class="nb-edit"></i>'
      },{
          id: "03",
          basename: "Base Name 3",
          database: "Database 3",
          object: "Table Name",
          formtype: "Document Type 3",
          action: '<i class="nb-edit"></i>'
      }]
  }
  
  /** Constants used to fill up our data base. */
  