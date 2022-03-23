import * as React from 'react';

import { Button, ButtonGroup, Checkbox, Chip, Divider, FormControl, FormControlLabel, Input, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';

import { Form } from '@unform/web'
import Menu from '../menu/menu';

import api from '../../services/produtos.controller';

import Footer from '../../components/footer';



const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    display: 'flex',
    flexDirection: 'column'
};


const mdTheme = createTheme();


export default function ProdutosListar() {
    const [produtos, setProdutos] = React.useState<any[]>([])
    const [idProduto, setIdProduto] = React.useState(0);
    const [codigo, setCodigo] = React.useState('');
    const [descricao, setDescricao] = React.useState('');
    const [coresSelect, setColorSelect] = React.useState<any[]>([]);
    const [cor, setColor] = React.useState<Cor>({ idCor: 1, nome: 'Amarelo' });
    const [valor, setValor] = React.useState('');
    const [estoque, setEstoque] = React.useState(true);

    //Editar produto - modal --------------------
    const [open, setOpen] = React.useState(false);

    function openDialog(idProduto: number, codigo: string, descricao: string, idCor: number, corNome: string, valor: string, estoque: boolean) {
        setIdProduto(idProduto)
        setCodigo(codigo)
        setDescricao(descricao)
        setColor({ idCor: idCor, nome: corNome })
        setValor(valor)
        setEstoque(estoque)

        return setOpen(true);
    }
    const handleClose = () => setOpen(false);
    //--------------------


    //Get dos produtos do Banco de dados -----
    React.useEffect(() => {
        async function loadProducts() {
            const response = await api.post('/api/Produtos/Selecionar')
            setProdutos(response.data.listaProdutos)
        }
        loadProducts()
    }, [])
    //--------------------


    //Get das cores do Banco de dados
    React.useEffect(() => {
        async function coresApi() {
            const response = await api.post('/api/Cores/Selecionar')
            setColorSelect(response.data.lista)
        }
        coresApi()
    }, [])
    //--------------------


    //Pega os dados da cor selecionada pelo usuário
    async function handleColor(id: number, codigo: string) {
        setColor({ idCor: id, nome: codigo })
    }
    //--------------------


    //Cadastro dos produtos
    async function cadastrarAtualizarProduto() {
        let data = {
            "idProduto": Number(idProduto),
            "codigo": codigo,
            "descricao": descricao,
            "valor": valor,
            "emEstoque": estoque ? true : false,
            "cor": [
                {
                    idCor: Number(cor.idCor),
                    nome: cor.nome
                }
            ],
        }
        const response = await api.post('/api/Produtos/CadastrarAtualizar', data).then(response => {
            alert(response.data.message);
        }).catch(error => {
            alert('Erro ao cadastrar produto')
            console.log(error);
        });
        setIdProduto(0)
        setCodigo('')
        setDescricao('')
        setColor({ idCor: 1, nome: 'Amarelo' })
        setValor(valor)
        setEstoque(estoque)

        handleClose()
        window.location.href = "/produtos/gerenciar"
    }
    //--------------------


    //Deleta o produto passando o id
    async function handleDelete(id: string) {
        if (window.confirm("Deseja realmente excluir o produto?")) {
            var result = await api.post('/api/Produtos/Excluir', { idProduto: id }).then(response => {
                alert(response.data.message);
                console.log(response)
            }).catch(error => {
                console.log(error);
            });
        }
        window.location.href = "/produtos/gerenciar"
    }
    //--------------------


    const checkEstoque = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEstoque(event.target.checked);
    };


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


    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Menu title={'Gerenciar Produtos'} />
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
                        <Grid container spacing={3}>
                            <Grid item sm={12} xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <h3>Cadastrar Produto</h3>
                                    <Form onSubmit={cadastrarAtualizarProduto}>
                                        <Grid container spacing={3}>
                                            <Grid item md={6} sm={12} xs={12}>
                                                <FormControl required={true} fullWidth variant="standard">
                                                    <InputLabel htmlFor="codigo">Código</InputLabel>
                                                    <Input type="text" inputProps={{ maxLength: 20 }} id="codigo" value={codigo} onChange={p => setCodigo(p.target.value)} />
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={6} sm={12} xs={12}>
                                                <FormControl required fullWidth variant="standard">
                                                    <InputLabel htmlFor="descricao">Descrição</InputLabel>
                                                    <Input type="text" inputProps={{ maxLength: 50 }} id="descricao" value={descricao} onChange={p => setDescricao(p.target.value)} />
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={4} sm={12} xs={12}>
                                                <FormControl required variant="standard" fullWidth>
                                                    <InputLabel id="labelColor">Cores</InputLabel>
                                                    <Select
                                                        defaultValue=""
                                                        labelId="labelColor"
                                                        id="color"
                                                        label="Cor">
                                                        {coresSelect.map((cor) => (
                                                            <MenuItem key={cor.id} value={cor.codigo} onClick={() => handleColor(cor.id, cor.codigo)}>
                                                                {cor.codigo}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={4} sm={12} xs={12}>
                                                <FormControl fullWidth variant="standard">
                                                    <InputLabel htmlFor="valor">Valor(R$)</InputLabel>
                                                    <Input
                                                        inputProps={{ maxLength: 50, }}
                                                        required
                                                        type="number"
                                                        name="valor"
                                                        id="valor"
                                                        value={valor}
                                                        onChange={p => setValor(p.target.value)} />
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={4} sm={12} xs={12}>
                                                <FormControlLabel
                                                    control={<Checkbox
                                                        checked={estoque}
                                                        color="secondary"
                                                        name="estoque"
                                                        onChange={checkEstoque}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />}
                                                    label="Em estoque" />
                                            </Grid>
                                            <Grid item md={12} sm={12} xs={12}>
                                                <Button fullWidth type="submit" variant="contained">Cadastrar</Button>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                </Paper>

                                <Divider light /><br></br>

                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TableContainer component={Paper}>
                                                <h2>Produtos</h2>
                                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell align="center">Código</TableCell>
                                                            <TableCell align="center">Descrição</TableCell>
                                                            <TableCell align="center">Cor</TableCell>
                                                            <TableCell align="center">Valor</TableCell>
                                                            <TableCell align="center">Em estoque</TableCell>
                                                            <TableCell align="center">Ações</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {produtos
                                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                            .map((produto: any) => (
                                                                <TableRow key={produto.idProduto} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                    <TableCell align="center">{produto.codigo}</TableCell>
                                                                    <TableCell align="center">{produto.descricao}</TableCell>
                                                                    <TableCell align="center">{produto.cor[0].nome}</TableCell>
                                                                    <TableCell align="center">{produto.valor}</TableCell>
                                                                    <TableCell align="center">{produto.emEstoque == true ? <Chip label="Sim" color="primary" variant="outlined" /> : <Chip label="Não" color="error" variant="outlined" />}</TableCell>
                                                                    <TableCell align="center">
                                                                        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                                                                            <Button color="primary" onClick={() => openDialog(produto.idProduto, produto.codigo, produto.descricao, produto.cor[0].idCor, produto.cor[0].nome, produto.valor, produto.emEstoque)}>Editar</Button>
                                                                            <Button color="error" onClick={() => handleDelete(produto.idProduto)}>Excluir</Button>
                                                                        </ButtonGroup>
                                                                        <Modal
                                                                            open={open}
                                                                            onClose={handleClose}>
                                                                            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                                                                                <Form onSubmit={cadastrarAtualizarProduto}>
                                                                                    <Grid container spacing={3}>
                                                                                        <Grid item sm={12}>
                                                                                            <Paper sx={style}>
                                                                                                <Grid container spacing={3}>
                                                                                                    <Grid item md={6} sm={12} xs={12}>
                                                                                                        <FormControl fullWidth variant="standard">
                                                                                                            <InputLabel htmlFor="codigo">Código</InputLabel>
                                                                                                            <Input required inputProps={{ maxLength: 20 }}
                                                                                                                id="codigo"
                                                                                                                value={codigo}
                                                                                                                onChange={p => setCodigo(p.target.value)} />
                                                                                                        </FormControl>
                                                                                                    </Grid>
                                                                                                    <Grid item md={6} sm={12} xs={12}>
                                                                                                        <FormControl fullWidth variant="standard">
                                                                                                            <InputLabel htmlFor="descricao">Descrição</InputLabel>
                                                                                                            <Input required inputProps={{ maxLength: 50 }}
                                                                                                                id="descricao"
                                                                                                                value={descricao}
                                                                                                                onChange={p => setDescricao(p.target.value)} />
                                                                                                        </FormControl>
                                                                                                    </Grid>
                                                                                                    <Grid item md={6} sm={12} xs={12}>
                                                                                                        <FormControl required variant="standard" fullWidth >
                                                                                                            <InputLabel id="labelColor">Cores</InputLabel>
                                                                                                            <Select
                                                                                                                labelId="labelColor"
                                                                                                                id="color"
                                                                                                                label="Cor"
                                                                                                                defaultValue={cor.nome} >
                                                                                                                {coresSelect.map((cor) => (
                                                                                                                    <MenuItem key={cor.id} value={cor.codigo} onClick={() => handleColor(cor.id, cor.codigo)}>
                                                                                                                        {cor.codigo}
                                                                                                                    </MenuItem>
                                                                                                                ))}
                                                                                                            </Select>
                                                                                                        </FormControl>
                                                                                                    </Grid>
                                                                                                    <Grid item md={6} sm={12} xs={12}>
                                                                                                        <FormControl fullWidth variant="standard">
                                                                                                            <InputLabel htmlFor="valor">Valor</InputLabel>
                                                                                                            <Input required inputProps={{ maxLength: 50 }}
                                                                                                                type="number"
                                                                                                                name="valor"
                                                                                                                id="valor"
                                                                                                                value={valor}
                                                                                                                onChange={p => setValor(p.target.value)} />
                                                                                                        </FormControl>
                                                                                                    </Grid>
                                                                                                    <Grid item md={6} sm={12} xs={12}>
                                                                                                        <FormControlLabel
                                                                                                            control={<Checkbox
                                                                                                                checked={estoque}
                                                                                                                color="secondary"
                                                                                                                name="estoque"
                                                                                                                onChange={checkEstoque}
                                                                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                                                                            />}
                                                                                                            label="Em estoque" />
                                                                                                    </Grid>
                                                                                                    <Grid item md={6} sm={12} xs={12}>
                                                                                                        <Button type="submit" fullWidth variant="contained" >Editar</Button>
                                                                                                    </Grid>
                                                                                                </Grid>
                                                                                            </Paper>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Form>
                                                                            </Container>
                                                                        </Modal>
                                                                    </TableCell>
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
                            </Grid>
                        </Grid>
                        <Footer sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box >
        </ThemeProvider >
    );

}

interface Cor {
    idCor: number,
    nome: string
}