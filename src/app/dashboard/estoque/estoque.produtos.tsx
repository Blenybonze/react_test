import { Box, Button, ButtonGroup, Checkbox, Chip, Container, CssBaseline, FormControl, FormControlLabel, Grid, Input, InputLabel, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Typography } from "@mui/material"
import { Form } from "@unform/web"
import React from "react"
import { createTheme, ThemeProvider } from '@mui/material/styles';


import api from "../../services/produtos.controller"
import Menu from "../menu/menu";

interface Data {
    codigo: string,
    descricao: string,
    cor: [
        { idCor: number, nome: string, }
    ],
    valor: string,
    emEstoque: boolean,
}


export default function ProdutosEstoque() {

    let [produtos, setProdutos] = React.useState<any[]>([])

    //Get dos produtos do Banco de dados -----
    React.useEffect(() => {
        async function loadEstoque() {
            const response = await api.post('/api/Produtos/Selecionar')

            await response.data.listaProdutos.map((produto: Data) => {
                if (produto.emEstoque == true) {
                    setProdutos(oldArray => [...oldArray, produto])
                }
            })
        }
        loadEstoque()
    }, [])
    //--------------------------------


    //Tabla ---------------------------
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    //--------------------

    const mdTheme = createTheme();

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Menu title={'Estoque'} />
                <Box component="main" sx={{
                    backgroundColor: (theme) => theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}>
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">Código</TableCell>
                                                    <TableCell align="center">Descrição</TableCell>
                                                    <TableCell align="center">Cor</TableCell>
                                                    <TableCell align="center">Valor</TableCell>
                                                    <TableCell align="center">Em estoque</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {produtos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((produto: any) => (
                                                        <TableRow key={produto.idProduto} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                            <TableCell align="center">{produto.codigo}</TableCell>
                                                            <TableCell align="center">{produto.descricao}</TableCell>
                                                            <TableCell align="center">{produto.cor[0].nome}</TableCell>
                                                            <TableCell align="center">{produto.valor}</TableCell>
                                                            <TableCell align="center">{produto.emEstoque == true ? <Chip label="Sim" color="primary" variant="outlined" /> : <Chip label="Não" color="error" variant="outlined" />}</TableCell>
                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        </Table >
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, 100]}
                                            component="div"
                                            count={produtos.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )

}