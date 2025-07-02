from flask import Flask, request, send_file
from flask_cors import CORS
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch
from io import BytesIO

app = Flask(__name__)
CORS(app)

@app.route('/gerar-curriculo',methods=['POST'])
def gerar_curriculo():
    dados = request.get_json()
    buffer = BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=A4)

    width, height = A4
    y = height - inch

    def linha_divisoria(titulo):
        nonlocal y
        y-= 20
        pdf.setFont("Helvetica-Bold", 12)
        pdf.drawString(50, y, "-" * 90)
        y-= 15
        pdf.drawString(50, y, titulo.upper())
        y -= 15
        pdf.drawString(50, y, "-" * 90)
        y -= 25

    def pula_linha(qtd=1):
        nonlocal y
        y -= 15 * qtd

    #Título
    pdf.setFont("Helvetica-Bold", 18)
    pdf.drawCentredString(width/2, y, "CURRÍCULO")
    y -= 40

    #Dados pessoais
    personal = dados.get('personalData', {})
    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(50, y, f"Nome: {personal.get('nome', '')}")
    pula_linha()
    pdf.drawString(50, y, f"E-mail: {personal.get('email', '')}")
    pula_linha()
    pdf.drawString(50, y, f"Telefone: {personal.get('telefone', '')}")
    pula_linha()
    pdf.drawString(50, y, f"Endereço: {personal.get('nome', '')}")
    pula_linha()

    #Formação
    educations = dados.get('educations',[])
    if educations:
        linha_divisoria("Formação Acadêmica")
        pdf.setFont("Helvetica",11)
        for edu in educations:
            curso = edu.get('curso','')
            instuicao = edu.get('instituicao','')
            conclusao = edu.get('conclusao','')
            pdf.drawString(60,y, f"📘 {curso} - {instuicao} ({conclusao})")
            pula_linha()
        pula_linha()

    #Experiência
    experiences = dados.get('experiences',[])
    if experiences:
        linha_divisoria("Experiência Profissional")
        pdf.setFont("Helvetica", 11)
        for exp in experiences:
            cargo = exp.get('cargo','')
            empresa = exp.get('empresa','')
            periodo = exp.get('periodo','')
            descricao = exp.get('descricao','').strip()
            pdf.drawString(60,y, f"💼 {cargo} - {empresa} ({periodo})")
            pula_linha()
            if descricao:
                pdf.drawString(70,y,f"↪ {descricao}")
                pula_linha()
            pula_linha()


    pdf.showPage()
    pdf.save()
    buffer.seek(0)

    return send_file(
        buffer, 
        as_attachment=True, 
        download_name="curriculo.pdf", 
        mimetype="application/pdf"
    )

if __name__ == '__main__':
    app.run(debug=True)