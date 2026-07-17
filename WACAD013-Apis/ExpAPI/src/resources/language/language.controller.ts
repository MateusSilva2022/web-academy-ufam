import { Request, Response } from 'express';

export function changeLanguage(req: Request, res: Response) {
  const { lang } = req.body;

  res.cookie('lang', lang);

  return res.status(200).json({
    message: 'Idioma alterado com sucesso.',
    lang,
  });
}