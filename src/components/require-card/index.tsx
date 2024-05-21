import React, { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Require } from '@/interfaces/require'

interface Props {
  item: Require
}

const CardItem: FC<Props> = ({ item }) => {
  return (
    <Box
      sx={{
        px: 1.5,
        py: 5,
      }}
    >
      <Box
        sx={{
          mx: 1,
          p: 2,
          height: 250,
          backgroundColor: 'background.paper',
          borderRadius: 4,
          transition: (theme) => theme.transitions.create(['box-shadow']),
          '&:hover': {
            boxShadow: 2,
          },
        }}
      >
        <Box id="top-title" sx={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5" color="#000" fontWeight={700} gutterBottom>
            {item.taskName}
          </Typography>
          <Typography variant="h5" color="#000" fontWeight={700} gutterBottom>
            {item.approvalStatus}
          </Typography>
        </Box>
        <Box id="sub-title" sx={{ display: 'flex', my: 2, alignContent: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" color="rgba(0, 0, 0, 0.6)" fontWeight={'light'} gutterBottom>
            10天前发布
          </Typography>
          <Typography variant="h6" color="rgba(0, 0, 0, 0.6)" fontWeight={'light'} gutterBottom>
            截止期限10天后
          </Typography>
        </Box>
        <Typography
          variant="subtitle1"
          color="rgba(0, 0, 0, 0.75)"
          fontWeight={400}
          gutterBottom
          sx={{ mb: 2 }}
          className="ellipsis-3"
        >
          {item.taskDesc}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}></Box>
      </Box>
    </Box>
  )
}

export default CardItem
