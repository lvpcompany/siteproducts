import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Search, Heart, ShoppingCart, Filter, Star, Dumbbell, Trophy, Briefcase, Laptop, GraduationCap, Coffee } from 'lucide-react'
import './App.css'

// Importar imagens
import heroImage from './assets/lvp_hero_section.png'
import healthIcon from './assets/search_images/5RgoGABsENYJ.jpg'
import sportsIcon from './assets/search_images/gkqqQ5TTASG0.png'
import businessIcon from './assets/search_images/Blr6r24uuneR.png'
import techIcon from './assets/search_images/EzhZM1aSEVPX.png'
import educationIcon from './assets/search_images/BSc27uIPbUfa.png'
import lifestyleIcon from './assets/search_images/WGOiU5HmNEte.png'

// Dados dos produtos
const categories = [
  { id: 'saude-fitness', name: 'Saúde e Fitness', icon: Dumbbell, image: healthIcon },
  { id: 'esporte', name: 'Esporte', icon: Trophy, image: sportsIcon },
  { id: 'empreendedorismo', name: 'Empreendedorismo', icon: Briefcase, image: businessIcon },
  { id: 'tecnologia', name: 'Tecnologia', icon: Laptop, image: techIcon },
  { id: 'educacao', name: 'Educação', icon: GraduationCap, image: educationIcon },
  { id: 'lifestyle', name: 'Lifestyle', icon: Coffee, image: lifestyleIcon }
]

const products = [
  // Saúde e Fitness
  {
    id: 1,
    name: 'Smartwatch Fitness',
    category: 'saude-fitness',
    type: 'físico',
    price: 'R$ 299,90',
    rating: 4.8,
    image: '/src/assets/search_images/kzGc6FFJggY0.jpg',
    description: 'Monitor de atividades com GPS e frequência cardíaca'
  },
  {
    id: 2,
    name: 'Kit de Bandas de Resistência',
    category: 'saude-fitness',
    type: 'físico',
    price: 'R$ 89,90',
    rating: 4.6,
    image: '/src/assets/search_images/xjmFsIoWpfPy.jpg',
    description: 'Kit completo para treino em casa'
  },
  {
    id: 3,
    name: 'Ebook Guia Completo de Treino em Casa',
    category: 'saude-fitness',
    type: 'digital',
    price: 'R$ 39,90',
    rating: 4.9,
    image: '/src/assets/search_images/H6w20QRkYNco.jpg',
    description: 'Guia completo com exercícios para fazer em casa'
  },
  // Esporte
  {
    id: 4,
    name: 'Bola de Futebol Profissional',
    category: 'esporte',
    type: 'físico',
    price: 'R$ 159,90',
    rating: 4.7,
    image: '/src/assets/search_images/u5egY61ZAADR.jpeg',
    description: 'Bola oficial para jogos profissionais'
  },
  {
    id: 5,
    name: 'Tênis de Corrida Alta Performance',
    category: 'esporte',
    type: 'físico',
    price: 'R$ 449,90',
    rating: 4.8,
    image: '/src/assets/search_images/I88iSXX6Twvp.jpg',
    description: 'Tênis profissional para corrida de longa distância'
  },
  {
    id: 6,
    name: 'Ebook Estratégias de Jogo para Futebol',
    category: 'esporte',
    type: 'digital',
    price: 'R$ 49,90',
    rating: 4.5,
    image: '/src/assets/search_images/998XRXdNtU2Z.jpg',
    description: 'Táticas e estratégias para melhorar seu jogo'
  },
  // Empreendedorismo
  {
    id: 7,
    name: 'Livro O Poder do Hábito',
    category: 'empreendedorismo',
    type: 'físico',
    price: 'R$ 34,90',
    rating: 4.9,
    image: '/src/assets/search_images/HjpErhvDMy7n.jpg',
    description: 'Best-seller sobre formação de hábitos'
  },
  {
    id: 8,
    name: 'Planner de Produtividade',
    category: 'empreendedorismo',
    type: 'físico',
    price: 'R$ 79,90',
    rating: 4.6,
    image: '/src/assets/search_images/qBsqRHVdnpU0.png',
    description: 'Planner para organizar sua rotina e metas'
  },
  {
    id: 9,
    name: 'Curso Online Como Criar seu Negócio Digital',
    category: 'empreendedorismo',
    type: 'digital',
    price: 'R$ 197,00',
    rating: 4.8,
    image: '/src/assets/search_images/cEg1UNYIJQRe.png',
    description: 'Curso completo para criar seu negócio online'
  },
  // Tecnologia
  {
    id: 10,
    name: 'Fone de Ouvido Bluetooth',
    category: 'tecnologia',
    type: 'físico',
    price: 'R$ 199,90',
    rating: 4.7,
    image: '/src/assets/search_images/27eGos0ejRfu.jpg',
    description: 'Fone wireless com cancelamento de ruído'
  },
  {
    id: 11,
    name: 'Teclado Mecânico Gamer',
    category: 'tecnologia',
    type: 'físico',
    price: 'R$ 349,90',
    rating: 4.8,
    image: '/src/assets/search_images/tBfkabPQJfBB.jpg',
    description: 'Teclado mecânico com iluminação RGB'
  },
  {
    id: 12,
    name: 'Pacote de Templates para Redes Sociais',
    category: 'tecnologia',
    type: 'digital',
    price: 'R$ 89,90',
    rating: 4.6,
    image: '/src/assets/search_images/yeI8MmuC8uJB.png',
    description: 'Pack com 100+ templates editáveis'
  }
]

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesType = selectedType === 'all' || product.type === selectedType
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesType && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">LVP Company</h1>
              <span className="ml-2 text-sm text-muted-foreground">Marketing Digital</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-foreground hover:text-primary transition-colors">Início</a>
              <a href="#products" className="text-foreground hover:text-primary transition-colors">Produtos</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">Sobre</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contato</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Produtos <span className="text-primary">Físicos</span> e <span className="text-secondary">Digitais</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Descubra nossa seleção exclusiva de produtos para transformar sua vida pessoal e profissional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Explorar Produtos
                </Button>
                <Button size="lg" variant="outline">
                  Saiba Mais
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="LVP Company Marketing Digital" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Nossas Categorias</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Card 
                  key={category.id} 
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-semibold text-sm">{category.name}</h4>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h3 className="text-3xl font-bold mb-4 md:mb-0">Nossos Produtos</h3>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="all">Todas as categorias</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              
              <select 
                value={selectedType} 
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="all">Todos os tipos</option>
                <option value="físico">Produtos Físicos</option>
                <option value="digital">Produtos Digitais</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge 
                    className={`absolute top-2 right-2 ${
                      product.type === 'físico' ? 'bg-secondary' : 'bg-accent'
                    }`}
                  >
                    {product.type}
                  </Badge>
                </div>
                
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2 line-clamp-2">{product.name}</CardTitle>
                  <CardDescription className="text-sm mb-3 line-clamp-2">
                    {product.description}
                  </CardDescription>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {product.rating}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">{product.price}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="sm">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Comprar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Nenhum produto encontrado com os filtros selecionados.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">LVP Company</h4>
              <p className="text-primary-foreground/80">
                Sua parceira em marketing digital e produtos inovadores.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Produtos</h5>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Produtos Físicos</li>
                <li>Produtos Digitais</li>
                <li>Cursos Online</li>
                <li>Ebooks</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Empresa</h5>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Sobre Nós</li>
                <li>Contato</li>
                <li>Blog</li>
                <li>Suporte</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Contato</h5>
              <div className="text-primary-foreground/80">
                <p>contato@lvpcompany.com</p>
                <p>(11) 99999-9999</p>
                <p>São Paulo, SP</p>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
            <p>&copy; 2024 LVP Company Marketing Digital. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

