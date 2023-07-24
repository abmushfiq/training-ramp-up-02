import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import { initialRows } from "../../util/Data";


// EditToolBar is return the add new button component and it will creating empty data row abow the rows
function EditToolbar() {

  return (
    <GridToolbarContainer>
      <Button color="info" variant="contained" startIcon={<AddIcon />} >
        Add new
      </Button>
    </GridToolbarContainer>
  );
}

function DataTable() {
  //   // rows is the table data and its type
  const [rows, setRows] = React.useState(initialRows as GridRowsProp);
  //   // each row data will be stored in rowModesModel state
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});


  //validated age is 18 or above
  const AgeColumnValidator = (value: any) => {
    const parsedValue = Number(value);
    return isNaN(parsedValue) || parsedValue < 18 ? 18 : parsedValue;
  };

  // columns is the table header and its type and width
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      type: 'string',
      width: 180,
      editable: false
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 180,
      editable: true
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Male', 'Female', 'Other'],
    },
    {
      field: 'address',
      headerName: 'Address',
      type: 'string',
      width: 180,
      editable: true
    },
    {
      field: 'mobile',
      headerName: 'Mobile Number',
      type: 'string',
      width: 180,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'dof',
      headerName: 'Date of Birth',
      type: 'date',
      width: 180,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      valueParser: AgeColumnValidator
    },


    {
      field: 'actions',
      type: 'actions',
      headerName: 'Command',
      width: 240,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<Button color="info" variant="contained" startIcon={<SaveIcon />}>
                Save
              </Button>}
              label="Save"
              sx={{
                color: 'primary.main',
              }}

            />,
            <GridActionsCellItem
              icon={<Button color="warning" variant="contained" startIcon={<CancelIcon />}>
                Cencel
              </Button>}
              label="Cancel"
              className="textPrimary"

              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<Button color="info" variant="contained" startIcon={<EditIcon />}>
              Edit
            </Button>}
            label="Edit"
            className="textPrimary"

            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Button color="error" variant="contained" startIcon={<DeleteIcon />}>
              Delete
            </Button>}
            label="Delete"

            color="inherit"
          />,
        ];
      },
    },
  ];

  // return the table design
  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        slots={{
          toolbar: EditToolbar,

        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}

export default DataTable
