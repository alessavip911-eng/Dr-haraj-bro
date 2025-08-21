import { PrismaClient } from '@prisma/client'; import bcrypt from 'bcryptjs';
const prisma=new PrismaClient();
async function main(){
  const seller1=await prisma.user.upsert({ where:{username:'seller1'}, update:{}, create:{username:'seller1', passwordHash:await bcrypt.hash('pass123',10), phone:'0500000001', city:'الرياض'} });
  const buyer1=await prisma.user.upsert({ where:{username:'buyer1'}, update:{}, create:{username:'buyer1', passwordHash:await bcrypt.hash('pass123',10), phone:'0500000002', city:'جدة'} });
  await prisma.listing.createMany({ data:[
    { title:'تويوتا كامري 2018 نظيفة', description:'السيارة على الشرط، ممشى 95 ألف، صيانة وكالة.', category:'سيارات', price:68000, city:'الرياض', images:['https://picsum.photos/seed/camry/600/400'], sellerId:seller1.id },
    { title:'آيفون 14 برو مستخدم', description:'لون بنفسجي عميق، 256GB، مع الفاتورة.', category:'جوالات', price:3200, city:'جدة', images:['https://picsum.photos/seed/iphone/600/400'], sellerId:seller1.id },
    { title:'شقة 3 غرف للإيجار السنوي', description:'شقة واسعة قريبة من الخدمات.', category:'عقار', price:45000, city:'الدمام', images:['https://picsum.photos/seed/apartment/600/400'], sellerId:buyer1.id }
  ]});
}
main().then(async()=>{ await prisma.$disconnect(); console.log('Seeded.'); }).catch(async(e)=>{ console.error(e); await prisma.$disconnect(); process.exit(1); });
